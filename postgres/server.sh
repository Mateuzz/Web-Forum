#!/bin/sh

CONFIG_PATH=./config

count_files_in_dir() {
    count_result=$(ls -la $1 | wc -l)
    echo $((count_result - 3))
}

configure_credentials() {
    psql -c "ALTER USER \"${DB_USERNAME}\" WITH PASSWORD '${DB_PASSWORD}'"

    for PATH in /var/lib/postgres/sql /home /root; do
        if [ -f $PATH/.psql_history ]; then
            rm $PATH/.psql_history
            break
        fi
    done
}

start_db() {
    pg_ctl -l /var/log/postgresql/log.txt -o "-h 0.0.0.0 -p 5432" -w -t 3600 start
}

copy_config_files() {
    if [ -d $CONFIG_PATH ]; then
        echo "Info: Replacing config files from ${CONFIG_PATH} into ${PGDATA}"
        cp -vr $CONFIG_PATH/* ${PGDATA}
    else
        echo "Info: config directory does not exists, using the same config files in ${PGDATA}"
    fi
}

init_and_start_db() {
    rm -rf $PGDATA/* &&
    initdb --auth-host=scram-sha-256 &&
    copy_config_files &&
    start_db &&
    createuser ${DB_USERNAME} &&
    createdb ${DB_DATABASE} -O ${DB_USERNAME} &&
    configure_credentials
}

start() {
    if [ $(count_files_in_dir $PGDATA) -gt 0 ]; then
        echo "Info: Database files found, using it"

        copy_config_files &&
        start_db && 
        configure_credentials
    else
        echo "Info: Database not initiated, creating new database"
        init_and_start_db
    fi
}

start 

echo "Live: Database running";
