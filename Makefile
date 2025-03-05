biome-check:
	npx biome check ./src

biome-write:
	npx biome check --write ./src

tsc-check:
	npx tsc --noEmit

check:
	make biome-check
	make tsc-check

format:
	make biome-write

generate:
	npx prisma generate

migrate:
	npx prisma migrate dev --name init

studio:
	npx prisma studio

seed:
	npx prisma db seed

reset:
	npx prisma migrate reset
