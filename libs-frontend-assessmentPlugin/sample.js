$(document).ready(function () {
    const answers1 = [
        {
            text: "",
            image: {
                src: "https://s3.amazonaws.com/comprodls/cosmatt/products/cosmatt_1/19/assets/Chapter_1_MotionProfiles-Basic/media/MotionProfiles/image4.png"
            }
        },
        {
            text: "",
            image: {
                src: "https://s3.amazonaws.com/comprodls/cosmatt/products/cosmatt_1/19/assets/Chapter_1_MotionProfiles-Basic/media/MotionProfiles/image5.png"
            }
        },
        {
            text: "",
            image: {
                src: "https://s3.amazonaws.com/comprodls/cosmatt/products/cosmatt_1/19/assets/Chapter_1_MotionProfiles-Basic/media/MotionProfiles/image6.png"
            }
        },
        {
            text: "",
            image: {
                src: "https://s3.amazonaws.com/comprodls/cosmatt/products/cosmatt_1/19/assets/Chapter_1_MotionProfiles-Basic/media/MotionProfiles/image7.png"
            }
        }
    ];

    const answers2 = [
        {
            text: "Option1 one is this and that&mdash;be sure to include why its great"
        },
        {
            text: "Option2 two can be something else and selecting it will deselect option one"
        },
        {
            text: "Option3 two can be something else and selecting it will deselect option one disabled"
        },
        {
            text: "Option4 two can be something else and selecting it will deselect option one disabled"
        }
    ];

    $("#assessment").assessment({
        type: 'radio',
        radioGroupName: 'optionsRadios',
        showCheckAnswerButton: true,
        question: {
            text: "Given this velocity profile, which is the corresponding acceleration profile below?",
            image: {
                src: "https://s3.amazonaws.com/comprodls/cosmatt/products/cosmatt_1/19/assets/Chapter_1_MotionProfiles-Basic/media/MotionProfiles/image3.png"
            }
        },
        answers: answers2

    });
});