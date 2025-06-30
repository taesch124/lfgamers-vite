create table if not exists threads (
	uuid				uuid not null constraint pk_threads primary key,
    poster_id			uuid not null references users(uuid),
    content             text not null,
	posted_at			timestamp not null,
    modified_at         timestamp,
);

create unique index if not exists threads_uuid_index on threads (uuid);
create unique index if not exists threads_poster_index on users (poster_id);
create unique index if not exists threads_posted_at_index on users (posted_at);
