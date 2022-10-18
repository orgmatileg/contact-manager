test:
	echo "testing command"
db-stg-migration-up:
	echo $$GITHUB_ACTION && ./tools/goose -dir dbMigration postgres "user=$$STG_POSTGRES_USERNAME password=$$STG_POSTGRES_PASSWORD dbname=$$STG_POSTGRES_DATABASE_NAME host=$$STG_POSTGRES_HOST port=$$STG_POSTGRES_PORT sslmode=disable" up-by-one

db-stg-migration-down:
	./tools/goose -dir dbMigration postgres "user=$$STG_POSTGRES_USERNAME password=$$STG_POSTGRES_PASSWORD dbname=$$STG_POSTGRES_DATABASE_NAME host=$$STG_POSTGRES_HOST port=$$STG_POSTGRES_PORT sslmode=disable" down

db-migration-up:
	./tools/goose -dir dbMigration postgres "user=$$PROD_POSTGRES_USERNAME password=$$PROD_POSTGRES_PASSWORD dbname=$$PROD_POSTGRES_DATABASE_NAME host=$$PROD_POSTGRES_HOST port=$$PROD_POSTGRES_PORT sslmode=disable" up-by-one

db-migration-down:
	./tools/goose -dir dbMigration postgres "user=$$PROD_POSTGRES_USERNAME password=$$PROD_POSTGRES_PASSWORD dbname=$$PROD_POSTGRES_DATABASE_NAME host=$$PROD_POSTGRES_HOST port=$$PROD_POSTGRES_PORT sslmode=disable" down
