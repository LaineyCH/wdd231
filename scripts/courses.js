// select course buttons
const allButton = document.querySelector('#all-button');
const cseButton = document.querySelector('#cse-button');
const wddButton = document.querySelector('#wdd-button');

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

let filteredCourses = [];

// generate courses on loading of page
document.addEventListener('DOMContentLoaded', function () {
    generate_courses("all");
}, false);

// generate courses based on selected filter
function generate_courses(filterPhrase) {
    switch (filterPhrase) {
        case "all":
            filteredCourses = courses;
            break;
        case "cse":
            filteredCourses = courses.filter((course) => course.subject === 'CSE');
            break;
        case "wdd":
            filteredCourses = courses.filter((course) => course.subject === 'WDD');
            break;
        default:
    }
    // mark the selected button as visually active
    changeSelectedButton(filterPhrase);

    // display the selected courses
    let htmlCourses = "";
    filteredCourses.forEach((course) => {
        // Generate HTML for each course
        htmlCourses += `<div class="course-div completed-${course.completed}" data-course='${JSON.stringify(course)}'>
        ${course.subject} ${course.number}
    </div>`;
    });

    // send the generated courses to the HTML div
    document.getElementById("courses-content").innerHTML = htmlCourses;

    // attach event listeners to each course div
    document.querySelectorAll(".course-div").forEach((courseDiv) => {
        const course = JSON.parse(courseDiv.getAttribute("data-course"));
        courseDiv.addEventListener("click", () => {
            openCourseInfo(course);
        });
    });

    // get the total number of credits as well as incomplete credits and send to html div
    const {totalCredits, incompleteCredits} = filteredCourses.reduce(
        (acc, course) => {
            acc.totalCredits += course.credits; // Accumulate total credits (acc is an accumulator)
            if (!course.completed) {
                acc.incompleteCredits += course.credits; // Accumulate incomplete credits
            }
            return acc;
        },
        {totalCredits: 0, incompleteCredits: 0} // Initial values
    );
    document.getElementById("credits-required").innerHTML =
        `<h3>Credits Required: ${incompleteCredits} / ${totalCredits}</h3>`;
}

function changeSelectedButton(selectedPhrase) {
    // change active class on course buttons
    allButton.classList.remove('selected');
    cseButton.classList.remove('selected');
    wddButton.classList.remove('selected');

    switch (selectedPhrase) {
        case "all":
            allButton.classList.add('selected');
            break;
        case "cse":
            cseButton.classList.add('selected');
            break;
        case "wdd":
            wddButton.classList.add('selected');
            break;
        default:
    }
}

// create event listeners for course selection
allButton.addEventListener('click', () => {
    generate_courses("all");
});
cseButton.addEventListener('click', () => {
    generate_courses("cse");
});
wddButton.addEventListener('click', () => {
    generate_courses("wdd");
});

// MODAL
const courseInfo = document.querySelector("#course-info");

function openCourseInfo(course) {
    // clear modal
    courseInfo.innerHTML = '';
    // add elements to the modal
    const modalH1 = document.createElement("h1");
    modalH1.innerHTML = `${course.subject} ${course.number}`;
    const modalH2 = document.createElement("h2");
    modalH2.innerHTML = `${course.title}`;
    const modalP1 = document.createElement("p");
    modalP1.innerHTML = `Credits: ${course.credits}`;
    const modalP2 = document.createElement("p");
    modalP2.innerHTML = `${course.description}`;
    const modalP3 = document.createElement("p");
    modalP3.innerHTML = `Certificate: ${course.certificate}`;
    const modalP4 = document.createElement("p");
    modalP4.innerHTML = `Technologies: ${course.technology.join(", ")}`;
    const closeModal = document.createElement('button');
    closeModal.setAttribute('id', 'close-modal');
    closeModal.innerHTML = "❌";

    // append elements to the modal container
    courseInfo.appendChild(modalH1);
    courseInfo.appendChild(modalH2);
    courseInfo.appendChild(modalP1);
    courseInfo.appendChild(modalP2);
    courseInfo.appendChild(modalP3);
    courseInfo.appendChild(modalP4);
    courseInfo.appendChild(closeModal);

    // display the populated modal
    courseInfo.showModal();
    // add event listener to button to close modal
    closeModal.addEventListener("click", () => {
        courseInfo.close();
    });
}