// const user = {
//     id: 0,
//     userName: "Meitar Bachhhh",
//     nickname: "@string",
//     profilePicUrl: "https://media-exp1.licdn.com/dms/image/C4E03AQGVWtDqHrj7ug/profile-displayphoto-shrink_200_200/0/1581782936486?e=1634774400&v=beta&t=OtopsKoD4C_C01vUoamtaP4YDiag9ryJb5M3TFUYKmQ",
//     about: "Melech | Gever | Developer | Baller",
//     location: "Tel Aviv",
//     websiteAddress: "https://www.linkedin.com/in/meitar-bach/",
//     joinDate: "06.06.1994",
//     followersNum: 66,
//     followingNum: 6
// }
//
// tweets = [];
//
// localStorage.setItem('tweets', JSON.stringify(tweets));
// localStorage.setItem('user', JSON.stringify(user));
// localStorage.setItem('currentId', '0');

class Tweet {
    constructor(id, postingUser, content) {
        this.id = id;
        this.postingUser = postingUser;
        this.content = content;
        this.date = Date.now();
        this.liked = false;
    }
}

class TweetsApi {
    static getTweets = () => {
        return new Promise((resolve, reject) => {
            try {
                let tweets = JSON.parse(localStorage.getItem('tweets'));
                if (!tweets) {
                    localStorage.setItem('tweets', JSON.stringify([]));
                }
                resolve(tweets);
            } catch (err) {
                reject(err);
            }
        })
    }
}

window.onload = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let tweets = [];
    TweetsApi.getTweets().then(tweetsData => {
        tweets = tweetsData;
        initProfileData();
    }).catch(err => alert(err));

    const initProfileData = () => {
        document.querySelector(".profile-title-name").innerHTML = user.userName;
        document.querySelector(".profile-title-tweets-num").innerHTML = `${tweets.length} Tweets`;

        const profilePics = document.querySelectorAll(".profile-pic img");
        profilePics.forEach(picture => picture.setAttribute("src", user.profilePicUrl));
        document.querySelector(".profile-pic-captions h4").innerHTML = user.userName;
        document.querySelector(".profile-pic-captions span").innerHTML = user.nickname;

        document.querySelector(".profile-about p").innerHTML = user.about;
        document.getElementById("location").innerHTML = user.location;
        document.getElementById("website").innerHTML = user.websiteAddress;
        document.getElementById("join-date").innerHTML = user.joinDate;

        document.getElementById("followers").innerHTML = user.followersNum;
        document.getElementById("following").innerHTML = user.followingNum;
    }


    const createTweetElement = (tweet) => {
        const tweetTemplate = document.getElementById("tweet-template");
        const newTweet = tweetTemplate.content.cloneNode(true);
        newTweet.querySelector(".tweet").setAttribute("data-tweetId", tweet.id);
        newTweet.querySelector(".profile-pic img").setAttribute("src", tweet.postingUser.profilePicUrl);
        newTweet.querySelector(".tweet__user-name").innerHTML = tweet.postingUser.userName;
        newTweet.querySelector(".tweet__content").innerHTML = tweet.content;
        newTweet.querySelector(".tweet__user-name").innerHTML = tweet.postingUser.userName;

        if (tweet.liked) {
            newTweet.querySelector(".like-button").classList.add("liked");
        }

        const tweetLikeButton = newTweet.querySelector(".like-button");
        tweetLikeButton.addEventListener('click', () => {
            handleLikeClick(tweet.id);
        });

        return newTweet;
    }

    const handleLikeClick = (tweetId) => {
        TweetsApi.getTweets().then(tweetsData => {tweets = tweetsData}).catch(err => alert(err));
        let likedTweet = tweets.find(tweet => tweet.id == tweetId);
        likedTweet.liked = !likedTweet.liked;
        localStorage.setItem("tweets", JSON.stringify(tweets));

        refreshNewsFeed();
        refreshProfileTweets();
    }

    const appendTweetToContainer = (container, tweet) => {
        container.appendChild(tweet);
    }

    const removeTweetsFromContainer = (tweetsContainer) => {
        const tweetsInContainer = tweetsContainer.querySelectorAll(".tweet");
        tweetsInContainer.forEach(tweet => tweetsContainer.removeChild(tweet));
    }


    const profileNavItem = document.getElementById("profile-nav-item");
    profileNavItem.addEventListener('click', () => {
        const newsFeedContainer = document.querySelector(".newsfeed-container");
        const profileContainer = document.querySelector(".profile-container");
        refreshProfileTweets();

        newsFeedContainer.style.display = "none";
        profileContainer.style.display = "block";
    })

    const showHome = () => {
        const newsFeedContainer = document.querySelector(".newsfeed-container");
        const profileContainer = document.querySelector(".profile-container");
        refreshNewsFeed();

        profileContainer.style.display = "none";
        newsFeedContainer.style.display = "block";
    }

    const refreshNewsFeed = () => {
        const newsFeedTweets = document.querySelector(".newsfeed-tweets");
        removeTweetsFromContainer(newsFeedTweets);
        TweetsApi.getTweets().then(tweetsData => {tweets = tweetsData}).catch(err => alert(err));
        tweets.forEach(tweet => appendTweetToContainer(newsFeedTweets, createTweetElement(tweet)));
    }

    const refreshProfileTweets = () => {
        const profileTweetsContainer = document.querySelector(".profile-activity__tweets");
        removeTweetsFromContainer(profileTweetsContainer);
        TweetsApi.getTweets().then(tweetsData => {tweets = tweetsData}).catch(err => alert(err));
        for (let i = 0 ; i < 3 && i < tweets.length ; i++) {
            appendTweetToContainer(profileTweetsContainer, createTweetElement(tweets[i]));
        }
    }

    const homeNavItem = document.getElementById("home-nav-item");
    homeNavItem.addEventListener('click', showHome);

    const backHomeArrow = document.getElementById("back-home-arrow");
    backHomeArrow.addEventListener('click', showHome);

    const postTweet = () => {
        const tweetContent = document.querySelector(".post-tweet-text-box").value;
        let tweetId = parseInt(localStorage.getItem("tweetId"));
        TweetsApi.getTweets().then(tweetsData => {tweets = tweetsData}).catch(err => alert(err));
        tweets.push(new Tweet(tweetId, user, tweetContent));
        tweetId = tweetId + 1;
        localStorage.setItem('tweetId', tweetId.toString());
        localStorage.setItem('tweets', JSON.stringify(tweets));
        refreshNewsFeed();
    }

    const postTweetButton = document.getElementById("post-tweet-button");
    postTweetButton.addEventListener('click', postTweet);

    showHome();
    setInterval(refreshNewsFeed, 1000);
    setInterval(refreshProfileTweets, 1000);
}
