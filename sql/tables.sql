drop table if exists recruiters;

drop table if exists simon_says;
drop table if exists where_my_error;
drop table if exists fast_or_faster;
drop table if exists categories;
drop table if exists game_pad;

drop table if exists candidates;

create table recruiters (
recruiter_id     integer primary key NOT NULL AUTO_INCREMENT,
name             varchar(30),
username         varchar(30) unique,
password         varchar(40),
email            varchar(50)
);


create table candidates (
candidate_id     integer primary key NOT NULL AUTO_INCREMENT,
completion       boolean
);


create table simon_says (
user             integer,
points           integer,
start_time       datetime,
end_time         datetime,
completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table where_my_error (
user             integer,
correct          integer,
wrong            integer,
start_time       datetime,
end_time         datetime,
completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table fast_or_faster (
user             integer,
points           integer,
completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table categories (
user             integer,
correct          integer,
wrong            integer,
start_time       datetime,
end_time         datetime,
completed        boolean,
foreign key (user) references candidates(candidate_id)
);

create table game_pad (
user             integer,
correct          integer,
wrong            integer,
start_time       datetime,
end_time         datetime,
completed        boolean,
foreign key (user) references candidates(candidate_id)
);
