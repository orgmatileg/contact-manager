test:
	echo "testing command"
db-stg-migration-up:
	goose -dir dbMigration postgres "user=$$STG_POSTGRES_USERNAME password=$$STG_POSTGRES_PASSWORD dbname=$$STG_POSTGRES_DATABASE_NAME host=$$STG_POSTGRES_HOST port=$$STG_POSTGRES_PORT sslmode=disable" up-by-one

db-stg-migration-down:
	goose -dir dbMigration postgres "user=$$STG_POSTGRES_USERNAME password=$$STG_POSTGRES_PASSWORD dbname=$$STG_POSTGRES_DATABASE_NAME host=$$STG_POSTGRES_HOST port=$$STG_POSTGRES_PORT sslmode=disable" down

db-migration-up:
	goose -dir dbMigration postgres "user=$$PROD_POSTGRES_USERNAME password=$$PROD_POSTGRES_PASSWORD dbname=$$PROD_POSTGRES_DATABASE_NAME host=$$PROD_POSTGRES_HOST port=$$PROD_POSTGRES_PORT sslmode=disable" up-by-one

db-migration-down:
	goose -dir dbMigration postgres "user=$$PROD_POSTGRES_USERNAME password=$$PROD_POSTGRES_PASSWORD dbname=$$PROD_POSTGRES_DATABASE_NAME host=$$PROD_POSTGRES_HOST port=$$PROD_POSTGRES_PORT sslmode=disable" down
