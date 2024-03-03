function loadLatestPost() {
    fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
        .then((res) => res.json())
        .then((data) => displayLatestPost(data));
}
function displayLatestPost(posts) {
    //   console.log(data);
    const latestPostContainer = document.getElementById("latest-post-container");
    for (const post of posts) {
        const designation = (post.author.designation === undefined) ? "Unknown" : post.author.designation
        const postDate = (post.author.posted_date === undefined) ? "Unknown" : post.author.posted_date
        const postCard = document.createElement("div")
        postCard.classList = `card card-compact bg-base-100 shadow-xl border border-[#12132D26]`
        postCard.innerHTML = `
        <div class="card-body ">
                        <figure class="rounded-2xl"><img
                                src="${post.cover_image}"
                                alt="post" />
                        </figure>
                        <div class="flex gap-2 items-center">
                            <img src="images/calander.png" alt="">
                            <p class="text-[#12132D99] text-base lg:text-lg  ">${postDate}</p>
                        </div>
                        <h2 class="card-title text-lg lg:text-xl">${post.title}
                        </h2>
                        <p class="text-[#12132D99]">${post.description}</p>
                        <div class="flex gap-3">
                            <img class="h-16 w-16 rounded-full" src="${post.profile_image}" alt="">
                            <div>
                                <h3 class="card-title text-lg">${post.author.name}</h3>
                                <p class="text-[#12132D99]">${designation}</p>
                            </div>
                        </div>

                    </div>
        `
        latestPostContainer.appendChild(postCard)
    }

}
loadLatestPost();
