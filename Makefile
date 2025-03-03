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
