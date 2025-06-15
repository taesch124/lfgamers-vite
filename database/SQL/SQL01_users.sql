create table if not exists users (
	uuid				uuid not null constraint pk_users primary key,
	email				varchar(124) not null,
	username			varchar(64) not null,
	password			varchar(124) not null,
	last_login			timestamp
);

create unique index if not exists users_uuid_index on users (uuid);
create unique index if not exists users_username_index on users (username);
