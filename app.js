const Twitter = require('twitter');
const config = require('./config.js');

const T = new Twitter(config);

// Set up Twitter search parameters
const params = {
  q: '#nodejs',
  count: 1,
  result_type: 'recent',
  lang: 'en'
};

T.get('search/tweets', params, function(err, data, response) {
  if (!err) {
    data.statuses.forEach(tweet => {
      // get the tweet id from the returned data
      let id = { id: tweet.id_str };

      T.post('favorites/create', id, function(err, response) {
        if (!err) {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
        } else {
          console.log(err[0].message);
        }
      });
    });
  } else {
    console.log('Twitter api error: ', err);
  }
});
