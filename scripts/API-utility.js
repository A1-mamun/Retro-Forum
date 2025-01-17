// function for load all post & categorised post
function loadAllPost(category) {
    // document.getElementById("mark-as-read").classList.add("hidden")
    document.getElementById("spinner").classList.remove("hidden")
    setTimeout(() => {
        document.getElementById("spinner").classList.add("hidden")
        document.getElementById("mark-as-read").classList.remove("hidden")
        fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category}`)
            .then((res) => res.json())
            .then((data) => displayAllPost(data.posts));
    }, 2000);
}

// function for load latest post API
function loadLatestPost() {
    fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
        .then((res) => res.json())
        .then((data) => displayLatestPost(data));
}

// function for display latest post
function displayLatestPost(posts) {
    //   console.log(data);
    const latestPostContainer = document.getElementById("latest-post-container");
    for (const post of posts) {
        const designation = (post.author.designation === undefined) ? "Unknown" : post.author.designation
        const postDate = (post.author.posted_date === undefined) ? "No Publish Date" : post.author.posted_date
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

// function for display all post and categorised post
function displayAllPost(posts) {
    // console.log(posts)
    const allPostContainer = document.getElementById("all-post-container");
    allPostContainer.textContent = ""
    for (const post of posts) {
        // console.log(post)
        const status = (post.isActive === true) ? "badge-success" : "badge-error"
        // const postDate = (post.author.posted_date === undefined) ? "Unknown" : post.author.posted_date
        const postCard = document.createElement("div")
        postCard.classList = `bg-[#F3F3F5] p-10 rounded-3xl shadow-2xl flex flex-col lg:flex-row gap-5 lg:gap-8 font-inter`
        postCard.innerHTML = `
                            <div class="indicator w-20 h-20 ">
                                <img class=" rounded-2xl" src="${post.image}" alt="">
                                <span class="badge badge-xs ${status} indicator-item"></span>
                            </div>
                            <div class="w-full">
                                <div class="flex flex-col lg:flex-row gap-2 lg:gap-10 text-base text-[#12132DCC]">
                                    <p>#${post.category}</p>
                                    <p>Author : ${post.author.name}</p>
                                </div>
                                <div class="mt-2 pb-4 border-b-2 border-[#12132D40] border-dashed">
                                    <h2 class="card-title text-xl lg:text-2xl mb-3 font-mulish font-bold">${post.title}</h2>
                                    <p class="text-[#12132D99] text-base lg:text-lg">${post.description}</p>
                                </div>
                                <div class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between pt-4">
                                    <div class="flex justify-between lg:w-2/5">
                                        <div class="flex gap-3 items-center text-[#12132D99] text-base lg:text-lg">
                                            <img src="images/mesage.png" alt="">
                                            <p>${post.comment_count}</p>
                                        </div>
                                        <div class="flex gap-3 items-center text-[#12132D99] text-base lg:text-lg">
                                            <img src="images/eye.png" alt="">
                                            <p>${post.view_count}</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-between lg:w-2/5">
                                        <div class="flex gap-3 items-center text-[#12132D99] text-base lg:text-lg">
                                            <img src="images/clock.png" alt="">
                                            <p>${post.posted_time}   <span> min</span></p>
                                        </div>
                                        <img class="btn btn-circle mail" src="images/email.png" alt="">
                                    </div>

                                </div>
                            </div>
            `
        const mailButton = postCard.querySelector('.mail')
        mailButton.addEventListener("click", () => addOnRead(post))
        allPostContainer.appendChild(postCard)
    }
}

// function for add on mark as reed field
function addOnRead(post) {
    // console.log("clicked", fieldId)
    // console.log(post)
    const markReadContainer = document.getElementById("mark-as-read")
    const readCard = document.createElement("div")
    readCard.classList = `bg-white flex justify-between p-4 rounded-2xl mt-3 lg:mt-5 shadow-xl`
    readCard.innerHTML = `
                        <h3 class="lg:text-lg font-semibold ">${post.title}</h3>
                        <div class="flex gap-2 items-center text-[#12132D99] lg:text-lg pr-4 font-inter">
                            <img src="images/eye.png" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        `
    markReadContainer.appendChild(readCard);

    const readNumber = document.getElementById("read-number")
    const readNumberText = readNumber.innerText;
    console.log(readNumberText)
    let readNumberInt = parseInt(readNumberText)
    console.log(readNumberInt)

    readNumberInt++;
    console.log(readNumberInt)

    // set the incremented value
    readNumber.innerText = readNumberInt
}

// function call for load latest post API
loadLatestPost();

// function call for load All And categorised post API
loadAllPost("")

// handle search function
function searchHandle() {
    const searchField = document.getElementById("search-input");
    const searchInput = searchField.value;
    const valueLowerCase = searchInput.toLowerCase()
    // console.log(valueLowerCase)
    if (valueLowerCase !== "coding" && valueLowerCase !== "comedy" && valueLowerCase !== "music") {
        alert("Category must be 'coding' 'comedy' or 'music' ")
        return;
    }
    const category = `?category=${searchInput}`
    loadAllPost(category);
}




