document.addEventListener("DOMContentLoaded", () => {
    // Setup
    gsap.registerPlugin(
        ScrollTrigger,
        Observer,
        ScrollToPlugin,
        DrawSVGPlugin
    );

    let mm = gsap.matchMedia();
    // -------------------------------------------------------------------------
    // Desktop
    // -------------------------------------------------------------------------
    mm.add({
        desktop: "(min-width: 1025px)",
        mobileSmall: "(max-width: 768px) and (max-height: 844px)",
        mobileTall: "(max-width: 768px) and (min-height: 845px) and (max-height: 1023px)",
        tablet: "(min-width: 768px) and (min-height: 1024px)"
    }, (context) => {
        const { desktop, mobileSmall, mobileTall, tablet } = context.conditions;

        console.log("========== DEBUG ==========");
        console.log("Width :", window.innerWidth);
        console.log("Height:", window.innerHeight);

        console.log("small  :", mobileSmall);
        console.log("tall   :", mobileTall);
        console.log("tablet   :", tablet);
        console.log("desktop:", desktop);
        console.log("===========================");

        // -------------------------------------------------------------------------
        // Pre-load Animation
        // -------------------------------------------------------------------------
        // #region 
        const raysContainer = document.querySelector(".loader-rays");
        const totalRays = 36;

        for(let i = 0; i < totalRays; i++){

            const ray = document.createElement("span");

            const angle = (360 / totalRays) * i;

            let rayHeight;

            // alternating sizes
            if(i % 3 === 0){
                rayHeight = 40;
            }
            else if(i % 2 === 0){
                rayHeight = 25;
            }
            else{
                rayHeight = 12;
            }

            ray.style.height = `${rayHeight}px`;

            ray.style.transform =
                desktop ? `translate(-50%, -50%)
                           rotate(${angle}deg)
                           translateY(-140px)`:
                tablet ? `translate(-50%, -50%)
                          rotate(${angle}deg)
                          translateY(-140px)`:
                `translate(-50%, -50%)
                rotate(${angle}deg)
                translateY(-110px)`;

            raysContainer.appendChild(ray);

        }

        const rays = document.querySelectorAll(".loader-rays span");
        function randomizeRays(){

            rays.forEach(ray => {

                const randomHeight =
                    Math.random() * 30 + 10;

                ray.style.height = `${randomHeight}px`;

            });

        }
        /* change continuously */
        setInterval(randomizeRays, 300);

        window.addEventListener("load", () => {
            setTimeout(() => {

                document.body.style.overflow = "auto";
                document.body.style.overflowX = "hidden";
                document.querySelector(".loader-wrapper").classList.add("hide");

                setTimeout(() => {
                    document.querySelector(".loader-wrapper").remove();
                }, 1000)

            }, 500);
        })
        // #endregion
        // -------------------------------------------------------------------------
        // Hero Scroll Animation
        // -------------------------------------------------------------------------
        // #region 
        gsap.fromTo(".polaroid", {
            top: desktop ? "50%" :
                 tablet ? "25%":
                 "30%",
            left: desktop ? "65%" : 
                  tablet ? "55%" : 
                  "60%",
        }, {
            width: "100%",
            height: desktop ? "100%" : "60%",
            padding: "0",
            top: desktop ? "50%" : "30%",
            left: desktop ? "50%" : "50%",
            transform: "rotate(0deg) translate(-50%, -50%)",

            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=500",
                pin: true,
                scrub: 1
            }

        })
        // #endregion
        // -------------------------------------------------------------------------
        // Couple Scroll Animation
        // -------------------------------------------------------------------------
        //#region 
        const couplePortrait = document.querySelectorAll(".person-photo");
        const envelopes = document.querySelectorAll('[class*="envelope"]');        
        
        const coupleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".couple-section",
                start: "top top",
                end: "+=500",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        couplePortrait.forEach(portrait => {

            let rotation = 0;
            let top = 0;
            let left = 0

            if (portrait.classList.contains("bride")) {
                rotation = desktop ? 20:
                           10;
                top = mobileSmall ? '190%':
                      mobileTall ? '210%' :
                      tablet ? '300%':
                      '210%';
                left = desktop ? "60%" :
                       tablet ? "70%":
                       "75%";
            } else {
                rotation = desktop ? -20:
                           -10;
                top = mobileSmall ? '190%':
                      mobileTall ? '210%' :
                      tablet ? '300%':
                      '210%';
                left = desktop ? '40%' :
                       tablet ? '30%':
                       '25%';
            }
            
            coupleTl.to(portrait, {
                rotation: rotation,
                top: top,
                left: left
            }, 0),

            coupleTl.to(envelopes, {
                top: mobileSmall ? '280%' : 
                     mobileTall ? '380%' :
                     tablet ? '500%': 
                     '280%'
            }, 0),

            coupleTl.to(".couple-ornaments .flower", {
                top: mobileSmall ? '68%' : 
                     mobileTall ? '65%' :
                     tablet ? '60%': 
                     '20%'
            }, 0)

        })

        let strokeTl = gsap.timeline({
            delay: 0,
            scrollTrigger: {
                trigger: ".couple-ornaments",
                start: "top 100px",
                once: false
            }
        });

        strokeTl.
            fromTo(document.querySelectorAll('.couple-path'), {
                drawSVG: "0%"
            }, 
            {
                drawSVG: "100%",
                ease: "power2.in",
            }, 1)

        // #endregion
        // -------------------------------------------------------------------------
        // Story Scroll Animation
        // -------------------------------------------------------------------------
        // #region
        gsap.fromTo(".timeline-item", {
            opacity: 0,
            scale: 0,
        }, {
            opacity: 1,
            scale: 1,
            stagger: 0.3, 
            scrollTrigger: {
                trigger: ".timeline-section",
                start: "top 200px",
                once: false
            }
        })
        // #endregion
        // Gallery Scroll Animation
        // -------------------------------------------------------------------------
        // #region
        gsap.fromTo(".gallery-item", {
            scale: 0.5,
            top: "200%",
        }, {
            scale: 1,
            top: "50%",
            rotation: () => gsap.utils.random(-10, 10),
            duration: 1,
            stagger: 1,
            ease: "back.out(1.0) power2.in",

            scrollTrigger: {
                trigger: ".gallery",
                start: "top top",
                end: "+=2000",
                pin: true ,
                scrub: 1,
            }
        })
        // #endregion
    })
})