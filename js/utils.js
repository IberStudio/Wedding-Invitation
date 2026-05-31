// Styling in HTML
document.querySelectorAll("*")
    .forEach((child) => {

        let styles = []

        child.classList.forEach(cls => {

            const index = cls.indexOf("-");

            if(index === -1) return;

            let key =
                cls.slice(0, index);

            const value =
                cls.slice(index + 1);

                
                try {
                    if (Object.keys(child.style).includes(key) && cls.includes("-")) {
                        // camelCase → kebab-case
                        key = key.replace(
                            /[A-Z]/g,
                            letter => "-" + letter.toLowerCase()
                        );
                        styles.push(`${key}: ${value};`)
                }
            } catch (error) {
                console.log(error)
            }
            
        });

        child.style.cssText = styles.join(" ");
        
})