export default function states(playerClass, commentsClass, bannersClass) {
    const playerElement = document.querySelector(`.${playerClass}`),
          commentsElement = document.querySelector(`.${commentsClass}`),
          bannersElements = document.querySelectorAll(`.${bannersClass}`);

    let videoCommentsTime;
    let videoBannerCommentsTime;
    let imageCommentsTime;
          
    let kyivTime;
    clocks();

    setInterval(clocks, 1000*60);

    async function clocks() {
        await getKyivTime();
        timesFiller();
        if(kyivTime >= videoCommentsTime) {
            if(kyivTime >= videoBannerCommentsTime) {
                if(kyivTime < imageCommentsTime) {
                    videoBannerCommentsState();
                } else {
                    imageCommentsState();
                }
            } else {
                videoCommentsState();
            }
        } else {
            imageCommentsState();
        }
    }

    async function getKyivTime() {
        const result = await fetch('https://www.worldtimeapi.org/api/timezone/Europe/Kiev')
                             .then(answer => answer.json())
                             .then(answer => {
                                kyivTime = new Date(answer.utc_datetime);
                            })
                             .catch(answer => console.log(answer));
    }

    function imageCommentsState() {
        deleteActivity();
        commentsElement.classList.add('active');
    }

    function timesFiller() {
        videoCommentsTime = new Date(kyivTime);
        videoCommentsTime.setHours(18);
        videoCommentsTime.setMinutes(0);
        videoCommentsTime.setSeconds(0);
        videoCommentsTime.setMilliseconds(0);

        videoBannerCommentsTime = new Date(kyivTime);
        videoBannerCommentsTime.setHours(18);
        videoBannerCommentsTime.setMinutes(20);
        videoBannerCommentsTime.setSeconds(0);
        videoBannerCommentsTime.setMilliseconds(0);

        imageCommentsTime = new Date(kyivTime);
        imageCommentsTime.setHours(21);
        imageCommentsTime.setMinutes(0);
        imageCommentsTime.setSeconds(0);
        imageCommentsTime.setMilliseconds(0);
    }

    function videoBannerCommentsState() {
        deleteActivity();
        playerElement.classList.add('active');
        bannersElements.forEach(baner => {
            baner.classList.add('active');
        });
        commentsElement.classList.add('active');
    }
          
    function videoCommentsState() {
        deleteActivity();
        playerElement.classList.add('active');
        commentsElement.classList.add('active');
    }

    function deleteActivity() {
        playerElement.classList.remove('active');
        commentsElement.classList.remove('active');
        bannersElements.forEach(baner => {
            baner.classList.remove('active');
        });
    }
}   