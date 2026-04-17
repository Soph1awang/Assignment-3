// WORKS INFORMATION
const works = [
    {
        title: "GF Smith Greeting Cards",
        date: 2025,
        category: "Cards",
        label: "Cards, 2025",
        slides: [
            "media/images/Card1.png",
            "media/images/Card2.png",
            "media/images/Card3.png",
            "media/images/Card4.png",
            "media/images/Card5.png"
        ]
    },
    {
        title: "Map Project Office",
        date: 2025,
        category: "Branding",
        label: "Branding, 2025",
        slides: [
            "media/images/Map1.png",
            "media/images/Map2.png",
            "media/images/Map3.png",
            "media/images/Map4.png"
        ]
    },
    {
        title: "ISTD Typographic Awards",
        date: 2024,
        category: "Book",
        label: "Book, 2024",
        slides: [
            "media/images/Istd1.png",
            "media/images/Istd2.png",
            "media/images/Istd3.png",
            "media/images/Istd4.png",
            "media/images/Istd5.png"
        ]
    },
    {
        title: "At the End of the World, Plant a Tree",
        date: 2023,
        category: "Album",
        label: "Album, 2023",
        slides: [
            "media/images/Tree1.png",
            "media/images/Tree2.png",
            "media/images/Tree3.png",
            "media/images/Tree4.png",
            "media/images/Tree5.png",
            "media/images/Tree6.png",
            "media/images/Tree7.png"
        ]
    },
    {
        title: "Twenty-six Characters",
        date: 2011,
        category: "Book",
        label: "Book, 2011",
        slides: [
            "media/images/Character1.png",
            "media/images/Character2.png",
            "media/images/Character3.png",
            "media/images/Character4.png"
        ]
    },
    {
        title: "LogoArchive: Akogare 憧れ Issue",
        date: 2011,
        category: "Issue",
        label: "Issue, 2011",
        slides: [
            "media/images/Issue1.png",
            "media/images/Issue2.png",
            "media/images/Issue3.png",
            "media/images/Issue4.png",
            "media/images/Issue5.png",
            "media/images/Issue6.png"
        ]
    },
    {
        title: "Bond: Type Directors Club",
        date: 2020,
        category: "Book",
        label: "Book, 2020",
        slides: [
            "media/images/Bond1.png",
            "media/images/Bond2.png",
            "media/images/Bond3.png",
            "media/images/Bond4.png",
            "media/images/Bond5.png"
        ]
    },
    {
        title: "Whitechapel Gallery Identity",
        date: 2003,
        category: "Book",
        label: "Book, 2003",
        slides: [
            "media/images/White1.png",
            "media/images/White2.png",
            "media/images/White3.png",
            "media/images/White4.png",
            "media/images/White5.png",
            "media/images/White6.png"
        ]
    }
];

// CONNECT TO WORKS.HTML
const worksList = document.getElementById("works-list");
const sortButtons = document.querySelectorAll(".sort-btn");

// PAGE SETTINGS
let currentSort = "date";
let expandedWorkId = null;

// MAKE TITLE INTO SAFE ID
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

// GET WORK NAME FROM URL
function getWorkFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("work");
}

works.forEach(work => {
    work.id = slugify(work.title);
    work.currentSlide = 0;
});

// SORT WORKS BY DATE OR GENRE
function getSortedWorks(sortType) {
    const sortedWorks = [...works];

    if (sortType === "date") {
        sortedWorks.sort((a, b) => b.date - a.date || a.title.localeCompare(b.title));
    }

    if (sortType === "genre") {
        sortedWorks.sort((a, b) => {
            const categoryCompare = a.category.localeCompare(b.category);
            if (categoryCompare !== 0) return categoryCompare;
            return b.date - a.date;
        });
    }

    return sortedWorks;
}

// IMAGES FOR EXPANDED VIEW (SHOWS CURRENT + NEXT 2 IMAGES)
function getExpandedSlides(work) {
    const start = work.currentSlide;
    const slides = [];

    for (let i = 0; i < Math.min(3, work.slides.length); i++) {
        slides.push(work.slides[(start + i) % work.slides.length]);
    }

    return slides;
}

// ALL WORKS ON PAGE
function renderWorks(sortType) {
    currentSort = sortType;
    const sortedWorks = getSortedWorks(sortType);
    worksList.innerHTML = "";

    sortedWorks.forEach(work => {
        const isExpanded = expandedWorkId === work.id;
        const expandedSlides = getExpandedSlides(work);

        const workRow = document.createElement("div");
        workRow.classList.add("work-row");

        if (isExpanded) {
            workRow.classList.add("is-expanded");
        }

        workRow.dataset.workId = work.id;

        workRow.innerHTML = `
            <div class="work-trigger work-name">${work.title}</div>
            <div class="work-trigger work-meta">${work.label}</div>

            <div class="work-preview" aria-hidden="true">
                <div class="preview-image-wrap">
                    <button class="preview-arrow preview-arrow-left" type="button" aria-label="Previous image">&#8249;</button>

                    <img
                        class="preview-image preview-click-target"
                        src="${work.slides[work.currentSlide]}"
                        alt="${work.title} preview ${work.currentSlide + 1}"
                    >

                    <button class="preview-arrow preview-arrow-right" type="button" aria-label="Previous image">&#8250;</button>
                </div>

                <div class="preview-divider"></div>
                <div class="preview-count">${work.currentSlide + 1}/${work.slides.length}</div>
            </div>

            <div class="work-expanded">
                <div class="expanded-gallery-wrap">
                    <button class="expanded-arrow expanded-arrow-left" type="button" aria-label="Previous gallery images">&#8249;</button>

                    <div class="expanded-gallery">
                        ${expandedSlides.map((src, index) => `
                            <img
                                class="expanded-image ${index === 0 ? "expanded-main-image" : ""}"
                                src="${src}"
                                alt="${work.title} expanded image ${index + 1}"
                            >
                        `).join("")}
                    </div>

                    <button class="expanded-arrow expanded-arrow-right" type="button" aria-label="Next gallery images">&#8250;</button>
                </div>

                <div class="expanded-divider"></div>
            </div>
        `;

        worksList.appendChild(workRow);
    });

    attachPreviewEvents();
}

// UPDATE SMALL PREVIEW IMAGE AND COUNT
function updatePreview(workId) {
    const work = works.find(item => item.id === workId);
    const row = document.querySelector(`.work-row[data-work-id="${workId}"]`);

    if (!work || !row) return;

    const previewImg = row.querySelector(".preview-image");
    const previewCount = row.querySelector(".preview-count");

    if (previewImg) {
        previewImg.src = work.slides[work.currentSlide];
        previewImg.alt = `${work.title} preview ${work.currentSlide + 1}`;
    }

    if (previewCount) {
        previewCount.textContent = `${work.currentSlide + 1}/${work.slides.length}`;
    }
}

// OPEN EXPANDED GALLERY
function expandWork(workId) {
    expandedWorkId = workId;
    renderWorks(currentSort);
}

// CLOSE EXPANDED GALLERY
function collapseExpandedWork() {
    expandedWorkId = null;
    renderWorks(currentSort);
}

// OPEN MATCHING WORK FROM HOMEPAGE
function openWorkFromUrl() {
    const workTitleFromUrl = getWorkFromUrl();
    if (!workTitleFromUrl) return;

    const matchingWork = works.find(work => work.title === workTitleFromUrl);
    if (!matchingWork) return;

    expandedWorkId = matchingWork.id;
    renderWorks(currentSort);

    requestAnimationFrame(() => {
        const targetRow = document.querySelector(`.work-row[data-work-id="${matchingWork.id}"]`);
        if (targetRow) {
            targetRow.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        window.history.replaceState({}, document.title, "works.html");
    });
}

// ADD CLICK EVENTS
function attachPreviewEvents() {
    const rows = document.querySelectorAll(".work-row");

    rows.forEach(row => {
        const workId = row.dataset.workId;
        const work = works.find(item => item.id === workId);

        const workName = row.querySelector(".work-name");
        const workMeta = row.querySelector(".work-meta");

        const previewLeftArrow = row.querySelector(".preview-arrow-left");
        const previewRightArrow = row.querySelector(".preview-arrow-right");
        const previewImage = row.querySelector(".preview-click-target");

        const expandedLeftArrow = row.querySelector(".expanded-arrow-left");
        const expandedRightArrow = row.querySelector(".expanded-arrow-right");
        const expandedImages = row.querySelectorAll(".expanded-image");

        // STOP BUTTONS FROM AFFECTING TEXT

        [previewLeftArrow, previewRightArrow, expandedLeftArrow, expandedRightArrow].forEach(button => {
            if (button) {
                button.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                });
            }
        });

        // CLICK TITLE TO OPEN / CLOSE ENLARGED GALLERY
        if (workName) {
            workName.addEventListener("click", function (e) {
                e.stopPropagation();

                if (expandedWorkId === workId) {
                    collapseExpandedWork();
                } else {
                    expandWork(workId);
                }
            });
        }

        // CLICK DATE / CATEGORY TO OPEN / CLOSE ENLARGED GALLERY
        if (workMeta) {
            workMeta.addEventListener("click", function (e) {
                e.stopPropagation();

                if (expandedWorkId === workId) {
                    collapseExpandedWork();
                } else {
                    expandWork(workId);
                }
            });
        }

        // SMALL PREVIEW LEFT ARROW
        if (previewLeftArrow) {
            previewLeftArrow.addEventListener("click", function (e) {
                e.stopPropagation();
                work.currentSlide = (work.currentSlide - 1 + work.slides.length) % work.slides.length;
                updatePreview(workId);
            });
        }

        // SMALL PREVIEW RIGHT ARROW
        if (previewRightArrow) {
            previewRightArrow.addEventListener("click", function (e) {
                e.stopPropagation();
                work.currentSlide = (work.currentSlide + 1) % work.slides.length;
                updatePreview(workId);
            });
        }

        // CLICK SMALL IMAGE TO OPEN ENLARGED GALLERY
        if (previewImage) {
            previewImage.addEventListener("click", function (e) {
                e.stopPropagation();

                if (expandedWorkId === workId) {
                    collapseExpandedWork();
                } else {
                    expandWork(workId);
                }
            });
        }

        // ENLARGED GALLERY LEFT ARROW
        if (expandedLeftArrow) {
            expandedLeftArrow.addEventListener("click", function (e) {
                e.stopPropagation();
                work.currentSlide = (work.currentSlide - 1 + work.slides.length) % work.slides.length;
                renderWorks(currentSort);
            });
        }

        // ENLARGED GALLERY RIGHT ARROW
        if (expandedRightArrow) {
            expandedRightArrow.addEventListener("click", function (e) {
                e.stopPropagation();
                work.currentSlide = (work.currentSlide + 1) % work.slides.length;
                renderWorks(currentSort);
            });
        }

        // CLICK ANY ENLARGED IMAGE TO CLOSE
        expandedImages.forEach(image => {
            image.addEventListener("click", function (e) {
                e.stopPropagation();
                collapseExpandedWork();
            });
        });
    });
}

// SORT BUTTON CLICKS
sortButtons.forEach(button => {
    button.addEventListener("click", () => {
        sortButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        expandedWorkId = null;
        renderWorks(button.dataset.sort);
    });
});

// START PAGE
renderWorks("date");
openWorkFromUrl();