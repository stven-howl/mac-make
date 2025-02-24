create view product_list_view as
select
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    count(post_upvotes.post_id) as upvotes
from posts
inner join topics using (topic_id)
inner join topics using (profile_id)
left join post_upvotes using (post_id)
group by posts.post_id, topics.name, profiles.name, profiles.avatar, profiles.username;
