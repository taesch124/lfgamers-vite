create table if not exists igdb_platforms (
    uuid				uuid not null constraint pk_igdb_platforms primary key,
	api_id				int,
    name			    varchar(128) not null
);

create unique index if not exists igdb_platforms_uuid_index on igdb_platforms (uuid);
create unique index if not exists igdb_platforms_api_db_index on igdb_platforms (api_id);

insert into igdb_platforms (uuid, api_id, name) values
(
    overlay(overlay(md5(random()::text || ':' || random()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::uuid,
    167,
    'Playstation 5'
),(
    overlay(overlay(md5(random()::text || ':' || random()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::uuid,
    169,
    'Xbox Series X|S'
),(
    overlay(overlay(md5(random()::text || ':' || random()::text) placing '4' from 13) placing to_hex(floor(random()*(11-8+1) + 8)::int)::text from 17)::uuid,
    130,
    'Nintendo Switch'
);