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
simon_says_points           integer,
simon_says_start_time       datetime,
simon_says_end_time         datetime,
simon_says_completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table where_my_error (
user             integer,
where_my_error_correct          integer,
where_my_error_wrong            integer,
where_my_error_start_time       datetime,
where_my_error_end_time         datetime,
where_my_error_completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table fast_or_faster (
user             integer,
fast_or_faster_points           integer,
fast_or_faster_completed        boolean,
foreign key (user) references candidates(candidate_id)
);


create table categories (
user             integer,
categories_correct          integer,
categories_wrong            integer,
categories_start_time       datetime,
categories_end_time         datetime,
categories_completed        boolean,
foreign key (user) references candidates(candidate_id)
);

create table game_pad (
user             integer,
game_pad_correct          integer,
game_pad_wrong            integer,
game_pad_start_time       datetime,
game_pad_end_time         datetime,
game_pad_completed        boolean,
foreign key (user) references candidates(candidate_id)
);
