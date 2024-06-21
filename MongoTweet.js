db.users.find().count()
db.users.find().limit(5).pretty()
db.users.distinct( "user_name" )
db.users.distinct("user_name").length
db.users.find({user_name:/james_the_cat1/},{_id:0})
db.users.find({"$where": "this.user.FollowersCount > this.user.FriendsCount"}).count()
db.users.find( { "user.Location": { $exists: true, $nin: [ null ] } } ).count()
db.users.find({},{_id:0,retweet_count:0,tweet_followers_count:0,source:0,coordinates:0,tweet_mentioned_count:0,tweet_ID:0,tweet_text:0,user:0}).sort({"user.FollowersCount":-1}).limit(1)
db.users.find({},{_id:0,retweet_count:0,tweet_followers_count:0,source:0,coordinates:0,tweet_mentioned_count:0,tweet_ID:0,tweet_text:0,user:0}).sort({"user.FriendsCount":1}).limit(1)
db.users.find({tweet_text: {$not: /FIFA/}},{tweet_text: /goal/}).count()


// tweet_text_map_function
var tweet_text_map_function=function(){emit(this.tweet_text , this.tweet_text);}
// tweet_text_reduce_function
var tweet_text_reduce_function=function(o_key,reduce_data_org){return Array.sum(reduce_data_org);}
// Applying the mapReduce function on users table
db.users.mapReduce( tweet_text_map_function,tweet_text_reduce_function,{out:"MongoTweetResults"})
