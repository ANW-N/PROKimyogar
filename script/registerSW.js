if ("serviceWorker" in navigator) {
    let waitingWorker = null;
    let updateRequested = false;

    function createUpdateBanner() {
        let banner = document.getElementById("pwa-update-banner");

        if (banner) return banner;

        banner = document.createElement("div");
        banner.id = "pwa-update-banner";
        banner.className = "pwa-update-banner";
        banner.setAttribute("role", "status");
        banner.setAttribute("aria-live", "polite");

        banner.innerHTML = `
            <div class="pwa-update-banner__content">
                <span class="pwa-update-banner__icon"
                      aria-hidden="true">
                    <i class="fa-solid fa-arrow-rotate-right"></i>
                </span>

                <div class="pwa-update-banner__text">
                    <strong>Yangi versiya chiqdi!</strong>
                    <span>PROKimyogar'ni yangilash mumkin.</span>
                </div>
            </div>

            <div class="pwa-update-banner__actions">
                <button type="button"
                        class="pwa-update-banner__later">
                    Keyinroq
                </button>

                <button type="button"
                        class="pwa-update-banner__install">
                    Yangilash
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        banner.querySelector(
            ".pwa-update-banner__later"
        ).addEventListener("click", () => {
            banner.classList.remove("is-visible");
        });

        banner.querySelector(
            ".pwa-update-banner__install"
        ).addEventListener("click", () => {
            if (!waitingWorker) return;

            updateRequested = true;

            const button = banner.querySelector(
                ".pwa-update-banner__install"
            );

            button.disabled = true;
            button.textContent = "Yangilanmoqda...";

            waitingWorker.postMessage({
                type: "SKIP_WAITING"
            });
        });

        return banner;
    }

    function showUpdateBanner(worker) {
        waitingWorker = worker;

        const banner = createUpdateBanner();
        const button = banner.querySelector(
            ".pwa-update-banner__install"
        );

        button.disabled = false;
        button.textContent = "Yangilash";

        banner.classList.add("is-visible");
    }

    navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {
            if (updateRequested) {
                window.location.reload();
            }
        }
    );

    async function registerPWA() {
        try {
            const registration =
                await navigator.serviceWorker.register("./sw.js", {
                    scope: "./"
                });

            function checkWaitingWorker() {
                if (
                    registration.waiting &&
                    navigator.serviceWorker.controller
                ) {
                    showUpdateBanner(registration.waiting);
                }
            }

            checkWaitingWorker();

            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;

                if (!newWorker) return;

                newWorker.addEventListener("statechange", () => {
                    if (
                        newWorker.state === "installed" &&
                        navigator.serviceWorker.controller
                    ) {
                        showUpdateBanner(newWorker);
                    }
                });
            });

            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    registration.update().catch((error) => {
                        console.warn(
                            "Yangilanish tekshiruvi bajarilmadi:",
                            error
                        );
                    });
                }
            });

            console.log(
                "PROKimyogar Service Worker:",
                registration.scope
            );
        } catch (error) {
            console.error(
                "Service Worker xatosi:",
                error
            );
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            registerPWA,
            { once: true }
        );
    } else {
        registerPWA();
    }
}