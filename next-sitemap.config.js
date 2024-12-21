const supportedLanguages = ['en', 'fr']; // Définissez vos langues supportées ici

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://spentonwow.com', // L'URL de base de votre site
    generateRobotsTxt: true, // Génération automatique du robots.txt
    changefreq: 'daily', // Fréquence d'exploration suggérée
    priority: 0.7, // Priorité par défaut des pages
    sitemapSize: 5000, // Nombre maximum d'URL par fichier sitemap
    transform: async (config, path) => {
        return {
            loc: path, // URL
            changefreq: 'daily',
            priority: 0.7, // Priorité spécifique pour certaines routes
            lastmod: new Date().toISOString(), // Date de dernière modification
        };
    },
    additionalPaths: async (config) => {
        const paths = [];
        supportedLanguages.forEach((lang) => {
            paths.push({ loc: `/${lang}/confidentiality` });
            paths.push({ loc: `/${lang}/cookies` });
            paths.push({ loc: `/${lang}/dashboard` });
            paths.push({ loc: `/${lang}/error` });
            paths.push({ loc: `/${lang}/legal` });
            paths.push({ loc: `/${lang}` });
        });

        return paths;
    },
};
