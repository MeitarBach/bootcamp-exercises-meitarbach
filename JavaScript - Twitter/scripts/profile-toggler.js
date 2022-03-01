this.tweets = [
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
    {author:this.userProfile, date:"June 6", content:"Skiing is a means of transport using skis to glide on snow. Variations of purpose include basic transport, a recreational activity, or a competitive winter sport. Many types of competitive skiing events are recognized by the International Olympic Committee (IOC), and the International Ski Federation (FIS)."},
]

this.userProfile = {
    userName: "Meitar Bach",
    profilePicUrl: "https://media-exp1.licdn.com/dms/image/C4E03AQGVWtDqHrj7ug/profile-displayphoto-shrink_200_200/0/1581782936486?e=1632960000&v=beta&t=WLmN1-ph9bsu8kO4wTvxhUHHk5T_Wq_mrz3c0ltN7fs",
    coverPhotoUrl: "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c25vdyUyMG1vdW50YWlufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80",
    numOfTweets: this.tweets.length,
    nickName: "@String",
    about: "Achla Gever | Ohev Ski | Fullstack Developer",
    location: "Tel Aviv",
    link: "https://www.linkedin.com/in/meitar-bach/",
    joinDate: "6.6.1966",
    followingNum: 6,
    followersNum: 6666
}

window.onload = () => {
    const profileNavItem = document.getElementById("profile-nav-item");
    profileNavItem.onclick = () => {
        const newsFeedContainter = document.querySelector(".newsfeed-container");
        const profileContainer = document.querySelector(".profile-container");
        newsFeedContainter.style.display = "none";
        profileContainer.style.display = "flex";
        profileContainer.style.flexDirection = "column";
    }

    const goHome = () => {
        window.console.log("hello");
        const newsFeedContainter = document.querySelector(".newsfeed-container");
        const profileContainer = document.querySelector(".profile-container");
        newsFeedContainter.style.display = "flex";
        profileContainer.style.display = "none";
    }

    const backHomeButton = document.querySelector(".back-home-button");
    const homeNavItem = document.getElementById("home-nav-item");
    backHomeButton.onclick = goHome;
    homeNavItem.onclick = goHome;
}