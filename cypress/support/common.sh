# Copyright (C) TOSHIBA CORPORATION, 2024. Part of the SW360 Frontend Project.
# Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/

# SPDX-License-Identifier: EPL-2.0
# License-Filename: LICENSE

option="$1"

COUCHDB_IP=$(jq -r '.couchdb_ip' ./cypress.env.json)
COUCHDB_PORT=$(jq -r '.couchdb_port' ./cypress.env.json)
DB_NAME=$(jq -r '.couchdb_dbname' ./cypress.env.json)
COUCHDB_USERNAME=$(jq -r '.couchdb_username' ./cypress.env.json)
COUCHDB_PASSWORD=$(jq -r '.couchdb_password' ./cypress.env.json)
USER_DB_NAME=$(jq -r '.couchdb_users_dbname' ./cypress.env.json)

delete_all_components() {
    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/_find" -H "Content-Type: application/json" -d '{
        "selector": {
            "type": "component"
        },
        "fields": ["_id", "_rev"],
        "limit": 100
        }' | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

delete_all_releases() {
 curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/_find" -H "Content-Type: application/json" -d '{
        "selector": {
            "type": "release"
        },
        "fields": ["_id", "_rev"],
        "limit": 100
        }' | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

delete_all_projects() {
    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/_find" -H "Content-Type: application/json" -d '{
        "selector": {
            "type": "project"
        },
        "fields": ["_id", "_rev"],
        "limit": 100
        }' | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

delete_all_licenses() {
    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/_find" -H "Content-Type: application/json" -d '{
        "selector": {
            "type": "license"
        },
        "fields": ["_id", "_rev"],
        "limit": 100
        }' | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

create_license() {
    shortname="$1"
    JSON_DATA="
        {
            \"_id\": \"$shortname\",
            \"type\": \"license\",
            \"shortname\": \"$shortname\",
            \"fullname\": \"Attribution Assurance License\",
            \"externalLicenseLink\": \"https://spdx.org/licenses/$shortname.html\",
            \"externalIds\": {
                \"SPDX-License-Identifier\": \"$shortname\"
            },
            \"OSIApproved\": \"YES\",
            \"FSFLibre\": \"NA\",
            \"obligationDatabaseIds\": [],
            \"text\": \"text\",
            \"checked\": true,
            \"issetBitfield\": \"0\"
        }
    "

    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME" \
    -H "Content-Type: application/json" \
    -d "$JSON_DATA"
}

delete_license_by_short_name() {
    shortname="$1"
    revision=$(curl -sX GET "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/$shortname" | jq -r '._rev')
    curl -X DELETE "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/$shortname?rev=$revision"
}

create_vendor() {
    shortname1="$1"
    JSON_DATA="
    {
        \"type\": \"vendor\",
        \"shortname\": \"$shortname1\",
        \"fullname\": \"$shortname1\",
        \"url\": \"http://localhost:8080/$shortname1\"
    }
    "

    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME" \
    -H "Content-Type: application/json" \
    -d "$JSON_DATA"
}

delete_all_vendors() {
    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$DB_NAME/_find" -H "Content-Type: application/json" -d '{
        "selector": {
            "type": "vendor"
        },
        "fields": ["_id", "_rev"],
        "limit": 100
        }' | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

create_user() {
    email="$1"
    givename="$2"
    lastname="$3"
    usergroup="$4"
    JSON_DATA="
        {
            \"type\": \"user\",
            \"email\": \"$email\",
            \"userGroup\": \"$usergroup\",
            \"externalid\": \"sw360$givename\",
            \"fullname\": \"$givename $lastname\",
            \"givenname\": \"$givename\",
            \"lastname\": \"$lastname\",
            \"department\": \"DEPARTMENT1\",
            \"wantsMailNotification\": false,
            \"deactivated\": false,
            \"issetBitfield\": \"1\"
        }
    "

    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$USER_DB_NAME" \
    -H "Content-Type: application/json" \
    -d "$JSON_DATA"
}

delete_user_by_email() {
    email="$1"
    curl -X POST "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT/$USER_DB_NAME/_find" -H "Content-Type: application/json" -d "{
            \"selector\": {
                \"email\": \"$email\"
            },
            \"fields\": [\"_id\", \"_rev\"],
            \"limit\": 10
            }" | jq -r '.docs[] | "curl -X DELETE 'http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@$COUCHDB_IP:$COUCHDB_PORT'/'$USER_DB_NAME'/" + ._id + "?rev=" + ._rev' | sh
}

# Run function
case $option in
    deleteAllComponents)
        delete_all_components
        ;;

    deleteAllReleases)
        delete_all_releases
        ;;

    deleteAllProjects)
        delete_all_projects
        ;;

    deleteAllLicenses)
        delete_all_licenses
        ;;

    deleteLicenseByShortName)
        delete_license_by_short_name "$2"
        ;;

    createLicense)
        create_license "$2"
        ;;

    createVendor)
        create_vendor "$2" 
        ;;

    deleteAllVendors)
        delete_all_vendors
        ;;

    createUser)
        create_user "$2" "$3" "$4" "$5"
        ;;

    deleteUserByEmail)
        delete_user_by_email "$2"
        ;;

    *) ;;
esac