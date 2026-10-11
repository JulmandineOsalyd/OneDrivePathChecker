/**
 * OneDrive Path Checker - Translations
 * FR: displayed for French browser language
 * EN: displayed for all other languages
 * =========================================================
 */
window.TRANSLATIONS = {
    fr: {
        // Navigation
        nav_menu_label: 'Ouvrir le menu',
        nav_home: 'Accueil',
        nav_features: 'Comment ça marche ?',
        nav_faq: 'FAQ',
        nav_pricing: 'Tarifs',
        nav_contact: 'Contact',
        nav_download_short: 'Essai gratuit',

        // Hero (index)
        hero_h1: 'Vos fichiers ne s\'ouvrent plus dans OneDrive ?',
        hero_tagline: 'Obtenez un diagnostic clair en quelques secondes.',
        hero_subtitle: 'Repérez les fichiers dont le chemin est trop long, corrigez-les en quelques clics ou partagez un rapport détaillé avec vos équipes.',
        hero_alt: 'Aperçu de l\'application OneDrive Path Checker : score de conformité et liste des fichiers à corriger',
        hero_cta_buy: 'Acheter maintenant',

        // Problem section
        solution_h2: 'Un fichier qui ne s\'ouvre pas, c\'est une équipe bloquée.',
        solution_h2_sub: 'La cause est souvent invisible : un chemin de fichier trop long.',
        solution_card1_title: 'Fichiers impossibles à ouvrir',
        solution_card1_desc: 'Au-delà de 255 caractères, le fichier se synchronise mais Windows ne peut plus l\'ouvrir depuis l\'Explorateur. Vos équipes ne comprennent pas pourquoi.',
        solution_card2_title: 'Synchronisation bloquée',
        solution_more: `Comprendre l'erreur →`,
        solution_card2_desc: 'Au-delà de 400 caractères, OneDrive ne synchronise plus le fichier et affiche une erreur tant que le chemin est trop long.',

        // How it works section (fusionne l'ancienne section fonctionnalités)
        how_h2: 'Comment ça marche ?',
        how_step1_title: '1. Choisissez un dossier',
        how_step1_desc: 'Sélectionnez votre dossier OneDrive à scanner :',
        how_step1_b1: 'Aucun droit d\'administrateur requis',
        how_step1_b2: 'Aucun contenu de fichier n\'est lu, aucune donnée ne quitte votre appareil',
        how_step2_title: '2. Consultez le score',
        how_step2_desc: 'Découvrez combien de fichiers posent problème :',
        how_step2_b1: 'Un score de conformité global',
        how_step2_b2: 'Critiques en rouge, avertissements en orange, avec le nombre de caractères en trop',
        how_step3_title: '3. Corrigez et partagez',
        how_step3_desc: 'Raccourcissez les chemins de fichiers depuis l\'application :',
        how_step3_b1: 'Renommage guidé : espaces, ponctuation et tirets nettoyés en un clic, gain affiché en direct',
        how_step3_b2: 'Rapports PDF et CSV prêts à partager',

        // Pricing


        pricing_h2: 'Tarifs',
        pricing_b1_html: '<strong>Scans illimités</strong> avec score de conformité et répartition par gravité.',
        pricing_b2_html: '<strong>Renommage guidé</strong> : l\'élément le plus long est déjà sélectionné, la jauge montre le gain en direct.',
        pricing_b3_html: '<strong>Suivi des fichiers corrigés</strong> : retrouvez en un clic ce que vous avez déjà traité.',
        pricing_b4_html: '<strong>Rapports PDF et exports CSV</strong> prêts à partager avec votre équipe ou votre client.',
        pricing_cta_trial: 'Essai gratuit',
        pricing_cta_buy_note: 'Paiement unique · sans abonnement',
        pricing_lead_html: 'Essayez gratuitement pendant <strong>24 heures</strong>, puis achetez votre licence.',
        pricing_list_title: 'Tout est inclus',
        pricing_card_tag: 'Licence unique',
        pricing_price_value: '39,99 €',
        pricing_cta_buy: 'Acheter la licence',
        pricing_note_secure: 'Paiement sécurisé',
        pricing_trust_local: 'Exécution 100 % locale : aucune donnée partagée',
        pricing_multi_text: 'Entreprise : vous souhaitez déployer l\'outil sur plusieurs postes de travail ?',
        pricing_multi_cta: 'Demandez un devis',

        // Footer
        footer_copyright: '&copy; 2026 OneDrive Path Checker — Osalyd Consulting. Tous droits réservés.',

        // FAQ page
        faq_page_h1: 'Foire Aux Questions',
        faq_page_subtitle_html: 'Tout ce que vous devez savoir sur la solution.<br>Une question sans réponse ? <br> Contactez-nous à <a href="mailto:support-pathchecker@osalydconsulting.com?subject=OneDrive%20Path%20Checker%20-%20Demande%20de%20support">support-pathchecker@osalydconsulting.com</a>',
        faq_back_home: 'Retour à l\'accueil',
        faq_cat1_title: 'Comprendre le problème',
        faq_cat2_title: 'Utiliser l\'outil',
        faq_cat3_title: 'Sécurité et confidentialité',
        faq_cat5_title: 'À propos du développeur',

        faq_full_q1: 'Pourquoi certains fichiers OneDrive ne s\'ouvrent-ils plus ?',
        faq_full_q2: 'Quelles sont les erreurs de synchronisation OneDrive que je peux rencontrer ?',
        faq_full_q3: 'Pourquoi est-ce difficile à corriger sans outil ?',
        faq_full_q4: 'Que peut-on analyser, et comment la longueur est-elle mesurée ?',
        faq_full_q5: 'Jusqu\'à combien de fichiers peut-on scanner ?',
        faq_full_q6: 'Que faire une fois les fichiers problématiques identifiés ?',
        faq_full_q7: 'Sous quels formats exporter les résultats ?',
        faq_full_q8: 'Quelles sont les limites de l\'outil ?',
        faq_full_q9: 'Mes données sont-elles en sécurité ?',
        faq_full_q10: 'Faut-il des droits administrateur pour l\'utiliser ?',
        faq_full_q11: 'L\'outil modifie-t-il des fichiers ou des dossiers ?',
        faq_full_q15: 'Qui est à l\'origine de cet outil ?',

        faq_full_a1_html: `<p>Windows limite la longueur du « chemin » d'un fichier, c'est-à-dire son nom plus tous les dossiers qui le contiennent. Quand cette longueur devient trop grande, deux seuils posent problème :</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Limite</th><th>Conséquence</th><th>En savoir plus</th></tr></thead><tbody><tr><td>&gt; 255 caractères</td><td>⚠️ Avertissement : le fichier est synchronisé, mais Windows ne peut pas l'ouvrir depuis l'Explorateur. Il reste accessible en ligne (OneDrive ou Teams).</td><td class="faq-table-action"><a class="faq-table-btn" href="fichier-onedrive-impossible-a-ouvrir.html">Comprendre l'erreur</a></td></tr><tr><td>&gt; 400 caractères</td><td>🔴 Critique : OneDrive ne peut pas synchroniser le fichier.</td><td class="faq-table-action"><a class="faq-table-btn" href="erreur-chemin-acces-trop-long-onedrive.html">Comprendre l'erreur</a></td></tr></tbody></table></div><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Commencez par les fichiers critiques (plus de 400 caractères), puis traitez les avertissements (entre 256 et 400).</span></div>`,
        faq_full_a2_html: `<p><strong>Chemin &gt; 400 caractères</strong> : OneDrive affiche une erreur de synchronisation et indique le nombre de caractères en trop. Le fichier ne peut pas être synchronisé et OneDrive reste bloqué sur cette erreur tant que la longueur du chemin n'a pas été corrigée.</p><img src="images/OneDrive400.webp" width="1298" height="906" loading="lazy" alt="Message d'erreur OneDrive : « Nous ne pouvons pas synchroniser cet élément, car le chemin d'accès est trop long »" class="faq-image" style="width:40%"><p><strong>Chemin &gt; 255 caractères</strong> : le fichier est synchronisé, mais impossible à ouvrir directement depuis le dossier OneDrive. Il reste accessible en ligne ou via Teams. OneDrive n'indique pas la longueur du chemin, ce qui rend le diagnostic difficile sans outil dédié.</p><img src="images/OneDrive255.webp" width="610" height="262" loading="lazy" alt="Fenêtre Windows « Action interrompue » affichée pour un document Word au nom très long" class="faq-image" style="width:35%">`,
        faq_full_a3_html: `<p>Windows n'affiche pas toujours la longueur des chemins. <br>Sans outil, il faut copier chaque chemin dans un éditeur de texte pour en compter les caractères : une tâche irréaliste sur des milliers de fichiers.</p><p>OneDrive Path Checker réalise ce diagnostic en quelques secondes, avant que les erreurs n'apparaissent.</p>`,
        faq_full_a4_html: `<p>L'outil analyse un <strong>dossier OneDrive</strong> synchronisé sur votre poste. Il mesure la longueur du chemin Windows complet de chaque fichier, depuis la racine du disque. Par exemple :</p><code class="faq-code">C:\\Users\\julie\\OneDrive - Mon Entreprise\\Projets\\2024\\Document important.docx</code><p>Au-delà de 255 caractères, le fichier est signalé en avertissement ; au-delà de 400, il est signalé comme critique. Un chemin d'exactement 255 caractères est accepté.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>La limite de 255 caractères s'applique au chemin complet, y compris le nom de votre session Windows et celui du dossier OneDrive.</span></div>`,
        faq_full_a5_html: `<p>L'outil est conçu pour analyser des dossiers de taille professionnelle :</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Volume</th><th>Performance</th></tr></thead><tbody><tr><td>Jusqu'à 50 000 fichiers</td><td><span class="badge badge-success"><i class="fas fa-check-circle"></i> Rapide et fluide</span></td></tr><tr><td>50 000 à 100 000 fichiers</td><td><span class="badge badge-success"><i class="fas fa-check-circle"></i> Fonctionnel, quelques secondes d'attente</span></td></tr><tr><td>Au-delà de 100 000 fichiers</td><td><span class="badge badge-warning"><i class="fas fa-exclamation-triangle"></i> Possible ralentissement selon la machine</span></td></tr></tbody></table></div><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Pour les très gros volumes, analysez les dossiers principaux séparément plutôt que l'ensemble en une seule fois.</span></div>`,
        faq_full_a6_html: `<p>Pour chaque fichier, un menu « ⋯ » permet de le <strong>renommer</strong>, d'<strong>ouvrir son dossier</strong> ou de le <strong>supprimer</strong> (avec confirmation).</p><p>La fenêtre de renommage s'ouvre sur l'élément le plus long du chemin et montre en direct la nouvelle longueur par rapport aux limites. Trois boutons nettoient rapidement les espaces, la ponctuation et les tirets.</p><p>Les fichiers que vous corrigez restent dans la liste, en vert, et sont comptés dans la catégorie « Corrigés » : vous suivez votre avancement en direct.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Pour déléguer la correction, exportez le rapport et transmettez-le à la personne concernée : il contient le chemin complet et la longueur exacte de chaque fichier.</span></div>`,
        faq_full_a7_html: `<p>Deux formats sont disponibles : <strong>CSV</strong> (lisible dans Excel) et <strong>PDF</strong> (rapport prêt à imprimer ou à partager, avec le score de conformité). Les deux reprennent les colonnes de l'application :</p><ul class="faq-list"><li><i class="fas fa-angle-right"></i> Longueur totale</li><li><i class="fas fa-angle-right"></i> Excédent par rapport à 255 caractères</li><li><i class="fas fa-angle-right"></i> Excédent par rapport à 400 caractères</li><li><i class="fas fa-angle-right"></i> Niveaux de dossiers</li><li><i class="fas fa-angle-right"></i> Nom et chemin du fichier</li></ul><p>Les lignes sont triées du chemin le plus long au plus court. Seuls les fichiers encore à corriger y figurent.</p>`,
        faq_full_a8_html: `<p>Pour rester transparent, voici ce qu'il faut savoir :</p><ul class="faq-list"><li><i class="fas fa-angle-right"></i> Les fichiers de plus de 400 caractères ne sont pas synchronisés par OneDrive : ils peuvent être absents de votre poste, donc de l'analyse.</li><li><i class="fas fa-angle-right"></i> Le suivi des fichiers corrigés dure le temps de la session : un nouveau scan le remet à zéro.</li><li><i class="fas fa-angle-right"></i> Renommer un dossier modifie aussi le chemin des fichiers qu'il contient : lancez un nouveau scan pour mettre la liste à jour.</li></ul>`,
        faq_full_a9_html: `<p><strong>Oui.</strong> L'outil fonctionne entièrement en local sur votre poste. Aucun contenu de fichier n'est lu et aucune donnée (noms de fichiers, chemins, résultats) n'est transmise à un serveur externe. L'analyse ne nécessite pas de connexion Internet.</p>`,
        faq_full_a10_html: `<p><strong>Non.</strong> Aucun droit d'administrateur n'est requis. L'application s'exécute dans le contexte de l'utilisateur connecté et accède aux fichiers avec ses droits habituels.</p>`,
        faq_full_a11_html: `<p>Le scan est en <strong>lecture seule</strong>. L'outil ne modifie un fichier que si vous le demandez : renommage validé par vous, ou suppression d'un fichier avec confirmation. Il ne supprime jamais de dossier.</p>`,
        faq_full_a15_html: `<div class="faq-author"><div class="faq-author-avatar"><img src="https://onedrivepathchecker.com/images/JBR.png" width="64" height="64" alt="Julie BREDECHE, consultante Microsoft 365" style="width: 64px;"></div><div class="faq-author-info"><p>Cet outil a été développé par <strong>Julie BREDECHE</strong>, consultante Microsoft 365 depuis plus de 10 ans. Elle l'a conçu pour répondre à un besoin concret rencontré en mission : identifier rapidement les fichiers dont le chemin est trop long, avant qu'ils ne bloquent les équipes.</p><div class="faq-author-links"><a href="https://www.osalydconsulting.com/" target="_blank" rel="noopener"><i class="fas fa-globe"></i> osalydconsulting.com</a><a href="https://www.linkedin.com/in/juliebredeche/" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> linkedin.com/in/juliebredeche</a></div></div></div>`,

        // Guides : une page par erreur OneDrive
        art_cta_title: `Repérez tous les fichiers concernés en quelques secondes`,
        art_cta_text: `Analysez votre dossier OneDrive, corrigez les fichiers depuis l'application et partagez un rapport PDF ou CSV avec vos équipes.`,

        errsync_h1: `Erreur OneDrive : « le chemin d'accès est trop long »`,
        errsync_lead: `OneDrive refuse de synchroniser un fichier et affiche un message d'erreur. Voici ce qu'il signifie, pourquoi il apparaît et comment le corriger.`,
        errsync_body_html: `<h2>Le message d'erreur</h2><p>OneDrive affiche une fenêtre « Microsoft OneDrive » avec ce texte :</p><blockquote>« Désolé… Nous ne pouvons pas synchroniser cet élément, car le chemin d'accès est trop long. »</blockquote><p>Le message indique ensuite de combien de caractères il faut raccourcir le chemin (par exemple « Raccourcissez le chemin d'accès de 3 caractères et réessayez ») et propose de configurer OneDrive pour qu'il se synchronise avec un emplacement dont le chemin d'accès est plus court. Les boutons « Ouvrir l'emplacement », « Réessayer » et « Quitter » sont proposés.</p><img src="images/OneDrive400.webp" width="1298" height="906" loading="lazy" alt="Message d'erreur OneDrive : « Nous ne pouvons pas synchroniser cet élément, car le chemin d'accès est trop long »" class="article-image" style="max-width:540px"><p class="article-caption">Exemple de message d'erreur OneDrive pour un chemin de plus de 400 caractères.</p><h2>Pourquoi cette erreur apparaît</h2><p>Le « chemin » d'un fichier, c'est son nom plus tous les dossiers qui le contiennent. Au-delà de <strong>400 caractères</strong>, OneDrive ne peut pas synchroniser le fichier : il reste bloqué sur cette erreur tant que le chemin n'a pas été raccourci.</p><p>Les causes les plus fréquentes :</p><ul><li>des dossiers imbriqués sur de nombreux niveaux ;</li><li>des noms de dossiers ou de fichiers très longs : titres complets, dates, mentions « version finale », nom du projet répété à chaque niveau ;</li><li>des fichiers venant d'un ancien serveur de fichiers, où ces chemins ne posaient pas de problème.</li></ul><h2>Comment corriger l'erreur</h2><ol><li>Notez le nombre de caractères à retirer indiqué par OneDrive.</li><li>Cliquez sur « Ouvrir l'emplacement » pour afficher le fichier concerné.</li><li>Raccourcissez le nom du fichier ou celui de ses dossiers parents : supprimez les répétitions, les dates et les mentions inutiles.</li><li>Si nécessaire, remontez le dossier plus près de la racine de votre OneDrive.</li><li>Cliquez sur « Réessayer » : la synchronisation reprend.</li></ol><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Le message ne concerne qu'un fichier à la fois. Dans un grand dossier, d'autres fichiers peuvent être concernés : mieux vaut les repérer tous avant de corriger.</span></div>`,

        erropen_h1: `Fichier OneDrive impossible à ouvrir : un chemin trop long ?`,
        erropen_lead: `Le fichier est bien synchronisé, mais il ne s'ouvre pas depuis l'Explorateur Windows. La cause est souvent un chemin de plus de 255 caractères.`,
        erropen_body_html: `<h2>Le symptôme</h2><p>Le fichier apparaît dans votre dossier OneDrive, mais il ne s'ouvre pas depuis l'Explorateur Windows, ou Windows affiche une fenêtre d'erreur. OneDrive, lui, n'affiche aucune erreur de synchronisation et n'indique pas la longueur du chemin : le diagnostic est difficile sans outil dédié.</p><img src="images/OneDrive255.webp" width="610" height="262" loading="lazy" alt="Fenêtre Windows « Action interrompue » affichée pour un document Word au nom très long" class="article-image" style="max-width:480px"><p class="article-caption">Exemple de fenêtre Windows affichée pour un document dont le nom est très long.</p><h2>Pourquoi le fichier ne s'ouvre pas</h2><p>Windows limite la longueur du chemin complet d'un fichier à <strong>255 caractères</strong>. Ce chemin commence à la racine du disque et comprend le nom de votre session Windows et celui du dossier OneDrive, par exemple :</p><code class="faq-code">C:\\Users\\julie\\OneDrive - Mon Entreprise\\Projets\\2024\\Document important.docx</code><p>Entre <strong>256 et 400 caractères</strong>, OneDrive synchronise le fichier sans erreur, mais Windows ne peut plus l'ouvrir directement depuis l'Explorateur. Au-delà de 400 caractères, c'est la synchronisation elle-même qui est bloquée (voir <a href="erreur-chemin-acces-trop-long-onedrive.html">l'erreur « le chemin d'accès est trop long »</a>).</p><h2>Ouvrir le fichier en attendant</h2><p>Le fichier reste accessible en ligne : ouvrez-le depuis OneDrive dans votre navigateur, ou depuis Teams.</p><h2>Corriger durablement</h2><ul><li>Raccourcissez le nom du fichier.</li><li>Raccourcissez le nom de ses dossiers parents : supprimez les répétitions, les dates et les mentions « version finale ».</li><li>Remontez le dossier plus près de la racine de votre OneDrive.</li></ul><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Le nom de votre session Windows et celui du dossier OneDrive comptent dans les 255 caractères : sur un autre poste, le même fichier peut s'ouvrir sans problème.</span></div>`,

        errsync_related_html: `<h2>À lire aussi</h2><ul><li><a href="fichier-onedrive-impossible-a-ouvrir.html">Fichier OneDrive impossible à ouvrir : un chemin de plus de 255 caractères</a></li><li><a href="limite-longueur-chemin-onedrive.html">Limite de longueur de chemin OneDrive : 255 et 400 caractères</a></li></ul>`,
        erropen_related_html: `<h2>À lire aussi</h2><ul><li><a href="erreur-chemin-acces-trop-long-onedrive.html">Erreur OneDrive « le chemin d'accès est trop long » : comprendre et corriger</a></li><li><a href="limite-longueur-chemin-onedrive.html">Limite de longueur de chemin OneDrive : 255 et 400 caractères</a></li></ul>`,

        // Guide : limite de longueur de chemin OneDrive
        limits_h1: `Limite de longueur de chemin OneDrive : 255 et 400 caractères`,
        limits_lead: `Quelle est la longueur maximale d'un chemin OneDrive ? Deux limites différentes s'appliquent. Voici comment elles fonctionnent et que faire quand un fichier les dépasse.`,
        limits_body_html: `<h2>La réponse courte</h2><p>Deux limites s'appliquent à un fichier OneDrive. Elles n'ont pas la même origine ni les mêmes conséquences :</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Limite</th><th>Origine</th><th>Conséquence</th></tr></thead><tbody><tr><td><strong>400 caractères</strong></td><td>OneDrive, OneDrive pour le travail ou l'école et SharePoint dans Microsoft 365 : le chemin complet, nom du fichier compris</td><td>🔴 Le fichier ne peut pas être synchronisé (erreur « le chemin d'accès est trop long »).</td></tr><tr><td><strong>255 caractères</strong></td><td>Windows (limite « MAX_PATH » : 260 caractères au total, lettre du lecteur et caractère de fin compris)</td><td>⚠️ Le fichier est synchronisé, mais Windows et certaines applications ne peuvent pas l'ouvrir depuis l'Explorateur.</td></tr></tbody></table></div><h2>Pourquoi on lit 255, 256 ou 260</h2><p>Le chiffre varie selon ce que l'on compte : la lettre du lecteur (<code>C:\\</code>), le caractère de fin que Windows ajoute, ou seulement le nom du fichier. La limite officielle de Windows est de 260 caractères, caractère de fin inclus. OneDrive Path Checker signale en avertissement les chemins de plus de 255 caractères et en critique ceux de plus de 400.</p><h2>Ce qui compte dans la longueur</h2><ul><li><strong>Pour la limite de 400 caractères :</strong> le chemin complet du dossier et le nom du fichier, une fois décodés (un espace compte pour un caractère).</li><li><strong>Pour la limite de Windows :</strong> le chemin local complet depuis la racine du disque, y compris le nom de votre session Windows et celui du dossier OneDrive, par exemple <code>C:\\Users\\julie\\OneDrive - Mon Entreprise\\Projets\\Document.docx</code>. Le même fichier peut donc s'ouvrir sur un poste et pas sur un autre.</li></ul><h2>Peut-on relever la limite ?</h2><p>Pas la limite de 400 caractères de OneDrive et de SharePoint. En revanche, la limite de Windows (260 caractères au total) peut être levée pour les applications compatibles à partir de Windows 10 (version 1607) : il faut activer la prise en charge des chemins longs dans le Registre (valeur <code>LongPathsEnabled</code>) ou par la stratégie de groupe « Enable Win32 long paths », avec des droits d'administrateur. Toutes les applications ne la gèrent pas, et cela ne change rien à la limite de 400 caractères de OneDrive.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Le plus simple reste de raccourcir les chemins : remontez les dossiers près de la racine et supprimez les répétitions dans les noms.</span></div><h2>Vérifier vos fichiers</h2><p>Chercher ces chemins à la main dans des milliers de dossiers est irréaliste. OneDrive Path Checker analyse un dossier OneDrive en quelques secondes et liste les fichiers de plus de 255 caractères (avertissements) et de plus de 400 caractères (critiques), avec le nombre de caractères en trop. Vous les renommez depuis l'application, puis vous exportez un rapport PDF ou CSV.</p>`,
        limits_related_html: `<h2>À lire aussi</h2><ul><li><a href="erreur-chemin-acces-trop-long-onedrive.html">Erreur OneDrive « le chemin d'accès est trop long » : comprendre et corriger</a></li><li><a href="fichier-onedrive-impossible-a-ouvrir.html">Fichier OneDrive impossible à ouvrir : un chemin de plus de 255 caractères</a></li></ul>`,

        faq_full_q16: `Quelle est la longueur maximale d'un chemin OneDrive ?`,
        faq_full_a16_html: `<p>OneDrive et SharePoint limitent le chemin complet d'un fichier, nom compris, à <strong>400 caractères</strong>. Windows ajoute sa propre limite de <strong>255 caractères</strong> (« MAX_PATH » : 260 au total) pour ouvrir les fichiers depuis l'Explorateur.</p><p>En savoir plus : <a href="limite-longueur-chemin-onedrive.html">limite de longueur de chemin OneDrive : 255 et 400 caractères</a>.</p>`,

        footer_guides_title: `Guides`,
        footer_guide_limit: `Limite de longueur de chemin OneDrive`,
        footer_guide_sync: `Erreur « chemin d'accès trop long »`,
        footer_guide_open: `Fichier impossible à ouvrir`,

        // Contact page
        contact_h1: 'Nous contacter',
        contact_subtitle_html: 'Une question ou un commentaire ? <br>Nous sommes là pour vous aider.',
        contact_card1_title: 'Écrivez-nous',
        contact_card1_desc: 'Pour toute demande générale ou support technique',
        contact_card2_title: 'Délai de réponse',
        contact_card2_desc: 'Nous répondons généralement sous',
        contact_card2_highlight: '24 à 48 heures',
        contact_card3_title: 'Réponses rapides',
        contact_card3_desc: 'Consultez notre FAQ pour les questions les plus fréquentes',
        contact_card3_link: 'Voir la FAQ',
        contact_include_h2: 'Pour répondre au mieux à vos demandes de support :',
        contact_item1_html: '<strong>Précisez votre environnement</strong> - Exemple : Windows 11 / dossier OneDrive de 120 000 fichiers / version 1.1.0.0',
        contact_item2_html: '<strong>Donner une description précise</strong> - A quel étape vous rencontrez un problème ? Quels messages d\'erreur voyez-vous ?',
        contact_item3_html: '<strong>Fournir des captures d\'écran</strong> — Si vous signalez un bug, les visuels nous aident à comprendre et reproduire le problème',

        // Meta
        sales_email_subject: 'Demande de devis - OneDrive Path Checker',
        sales_email_body: 'Nom de votre organisation:\nNombre de postes concernés:\nÉchéance souhaitée:',
    },

    en: {
        // Navigation
        nav_menu_label: 'Open the menu',
        nav_home: 'Home',
        nav_features: 'How does it work?',
        nav_faq: 'FAQ',
        nav_pricing: 'Pricing',
        nav_contact: 'Contact',
        nav_download_short: 'Free trial',

        // Hero (index)
        hero_h1: 'OneDrive path too long?',
        hero_tagline: 'Find every file over the path length limit, in seconds.',
        hero_subtitle: 'Your OneDrive path length checker: spot files whose path is too long, fix them in a few clicks or share a detailed report with your teams.',
        hero_alt: 'Preview of the OneDrive Path Checker application: compliance score and list of files to fix',
        hero_cta_buy: 'Buy now',

        // Problem section
        solution_h2: 'A file that won\'t open means a blocked team.',
        solution_h2_sub: 'The cause is often invisible: a file path that is too long.',
        solution_card1_title: 'Files that won\'t open',
        solution_card1_desc: 'Beyond 255 characters, the file syncs but Windows can no longer open it from File Explorer. Your teams don\'t understand why.',
        solution_card2_title: 'Blocked synchronization',
        solution_more: 'Understand the error →',
        solution_card2_desc: 'Beyond 400 characters, OneDrive stops syncing the file and displays an error as long as the path is too long.',

        // How it works section (fusionne l'ancienne section fonctionnalités)
        how_h2: 'How does it work?',
        how_step1_title: '1. Choose a folder',
        how_step1_desc: 'Select your OneDrive folder to scan:',
        how_step1_b1: 'No administrator rights required',
        how_step1_b2: 'No file contents are read, no data leaves your device',
        how_step2_title: '2. Review the score',
        how_step2_desc: 'Find out how many files are a problem:',
        how_step2_b1: 'An overall compliance score',
        how_step2_b2: 'Critical in red, warnings in orange, with the number of excess characters',
        how_step3_title: '3. Fix and share',
        how_step3_desc: 'Shorten file paths from the application:',
        how_step3_b1: 'Guided renaming: spaces, punctuation and dashes cleaned in one click, gain shown live',
        how_step3_b2: 'PDF and CSV reports ready to share',

        // Pricing


        pricing_h2: 'Pricing',
        pricing_b1_html: '<strong>Unlimited scans</strong> with compliance score and breakdown by severity.',
        pricing_b2_html: '<strong>Guided renaming</strong>: the longest element is already selected, the gauge shows the gain live.',
        pricing_b3_html: '<strong>Fix tracking</strong>: find what you have already handled in one click.',
        pricing_b4_html: '<strong>PDF reports and CSV exports</strong> ready to share with your team or your client.',
        pricing_cta_trial: 'Free trial',
        pricing_cta_buy_note: 'One-time payment · no subscription',
        pricing_lead_html: 'Try it free for <strong>24 hours</strong>, then buy your license.',
        pricing_list_title: 'Everything included',
        pricing_card_tag: 'Single license',
        pricing_price_value: '€39.99',
        pricing_cta_buy: 'Buy the license',
        pricing_note_secure: 'Secure payment',
        pricing_trust_local: '100% local execution: no data shared',
        pricing_multi_text: 'Business: want to deploy the tool on several workstations?',
        pricing_multi_cta: 'Request a quote',

        // Footer
        footer_copyright: '&copy; 2026 OneDrive Path Checker — Osalyd Consulting. All rights reserved.',

        // FAQ page
        faq_page_h1: 'Frequently Asked Questions',
        faq_page_subtitle_html: 'Everything you need to know about the solution.<br>A question without an answer? <br> Contact us at <a href="mailto:support-pathchecker@osalydconsulting.com?subject=OneDrive%20Path%20Checker%20-%20Support%20Request">support-pathchecker@osalydconsulting.com</a>',
        faq_back_home: 'Back to home',
        faq_cat1_title: 'Understanding the problem',
        faq_cat2_title: 'Using the tool',
        faq_cat3_title: 'Security and privacy',
        faq_cat5_title: 'About the developer',

        faq_full_q1: 'Why do some OneDrive files no longer open?',
        faq_full_q2: 'What OneDrive sync errors might I encounter?',
        faq_full_q3: 'Why is it difficult to fix without a tool?',
        faq_full_q4: 'What can be scanned, and how is length measured?',
        faq_full_q5: 'How many files can be scanned?',
        faq_full_q6: 'What should I do once problematic files are identified?',
        faq_full_q7: 'In what formats can I export the results?',
        faq_full_q8: 'What are the tool\'s limitations?',
        faq_full_q9: 'Is my data safe?',
        faq_full_q10: 'Are administrator rights required to use it?',
        faq_full_q11: 'Does the tool modify files or folders?',
        faq_full_q15: 'Who created this tool?',

        faq_full_a1_html: `<p>Windows limits the length of a file's "path", meaning its name plus all the folders that contain it. When that length gets too long, two thresholds cause problems:</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Limit</th><th>Consequence</th><th>Learn more</th></tr></thead><tbody><tr><td>&gt; 255 characters</td><td>⚠️ Warning: the file syncs, but Windows cannot open it from File Explorer. It remains accessible online (OneDrive or Teams).</td><td class="faq-table-action"><a class="faq-table-btn" href="onedrive-file-wont-open.html">Understand the error</a></td></tr><tr><td>&gt; 400 characters</td><td>🔴 Critical: OneDrive cannot sync the file.</td><td class="faq-table-action"><a class="faq-table-btn" href="onedrive-path-too-long-error.html">Understand the error</a></td></tr></tbody></table></div><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Start with critical files (over 400 characters), then handle the warnings (between 256 and 400).</span></div>`,
        faq_full_a2_html: `<p><strong>Path &gt; 400 characters</strong>: OneDrive displays a sync error and shows the number of excess characters. The file cannot be synced and OneDrive stays stuck on this error until the path length is corrected.</p><img src="images/OneDrive400-en.webp" width="1298" height="906" loading="lazy" alt="OneDrive error message: « We can't sync this item because the file path is too long »" class="faq-image" style="width:40%"><p><strong>Path &gt; 255 characters</strong>: the file syncs, but cannot be opened directly from the OneDrive folder. It remains accessible online or via Teams. OneDrive does not indicate the path length, making diagnosis difficult without a dedicated tool.</p><img src="images/OneDrive255-en.webp" width="610" height="262" loading="lazy" alt="Windows « 1 interrupted action » dialog shown for a Word document with a very long file name" class="faq-image" style="width:35%">`,
        faq_full_a3_html: `<p>Windows does not always display path lengths.<br>Without a tool, you have to copy each path into a text editor to count the characters: an unrealistic task with thousands of files.</p><p>OneDrive Path Checker runs this diagnosis in seconds, before errors appear.</p>`,
        faq_full_a4_html: `<p>The tool scans a <strong>OneDrive folder</strong> synced on your computer. It measures the full Windows path length of each file, from the drive root. For example:</p><code class="faq-code">C:\\Users\\julie\\OneDrive - My Company\\Projects\\2024\\Important document.docx</code><p>Beyond 255 characters, the file is flagged as a warning; beyond 400, it is flagged as critical. A path of exactly 255 characters is accepted.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>The 255-character limit applies to the full path, including your Windows user name and the OneDrive folder name.</span></div>`,
        faq_full_a5_html: `<p>The tool is designed to scan professional-scale folders:</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Volume</th><th>Performance</th></tr></thead><tbody><tr><td>Up to 50,000 files</td><td><span class="badge badge-success"><i class="fas fa-check-circle"></i> Fast and smooth</span></td></tr><tr><td>50,000 to 100,000 files</td><td><span class="badge badge-success"><i class="fas fa-check-circle"></i> Functional, a few seconds wait</span></td></tr><tr><td>Beyond 100,000 files</td><td><span class="badge badge-warning"><i class="fas fa-exclamation-triangle"></i> Possible slowdown depending on machine</span></td></tr></tbody></table></div><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>For very large volumes, scan the main folders separately rather than everything at once.</span></div>`,
        faq_full_a6_html: `<p>For each file, a "⋯" menu lets you <strong>rename</strong> it, <strong>open its folder</strong> or <strong>delete</strong> it (with confirmation).</p><p>The rename window opens on the longest element of the path and shows the new length live against the limits. Three buttons quickly clean up spaces, punctuation and dashes.</p><p>Files you fix stay in the list, in green, and are counted in the "Fixed" category so you can follow your progress live.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>To delegate the fix, export the report and send it to the person concerned: it contains the full path and exact length of each file.</span></div>`,
        faq_full_a7_html: `<p>Two formats are available: <strong>CSV</strong> (readable in Excel) and <strong>PDF</strong> (a report ready to print or share, with the compliance score). Both use the same columns as the application:</p><ul class="faq-list"><li><i class="fas fa-angle-right"></i> Total length</li><li><i class="fas fa-angle-right"></i> Excess over 255 characters</li><li><i class="fas fa-angle-right"></i> Excess over 400 characters</li><li><i class="fas fa-angle-right"></i> Folder levels</li><li><i class="fas fa-angle-right"></i> File name and path</li></ul><p>Rows are sorted from the longest path to the shortest. Only files that still need fixing are listed.</p>`,
        faq_full_a8_html: `<p>To be transparent, here is what you should know:</p><ul class="faq-list"><li><i class="fas fa-angle-right"></i> Files over 400 characters are not synced by OneDrive: they may be missing from your computer, and therefore from the scan.</li><li><i class="fas fa-angle-right"></i> Fix tracking lasts for the session: a new scan resets it.</li><li><i class="fas fa-angle-right"></i> Renaming a folder also changes the path of the files it contains: run a new scan to update the list.</li></ul>`,
        faq_full_a9_html: `<p><strong>Yes.</strong> The tool runs entirely locally on your workstation. No file contents are read and no data (file names, paths, results) is sent to an external server. The scan does not require an internet connection.</p>`,
        faq_full_a10_html: `<p><strong>No.</strong> No administrator rights are required. The application runs in the context of the logged-in user and accesses files with their standard rights.</p>`,
        faq_full_a11_html: `<p>The scan is <strong>read-only</strong>. The tool only changes a file when you ask it to: a rename that you confirm, or a file deletion with confirmation. It never deletes a folder.</p>`,
        faq_full_a15_html: `<div class="faq-author"><div class="faq-author-avatar"><img src="https://onedrivepathchecker.com/images/JBR.png" width="64" height="64" alt="Julie BREDECHE, Microsoft 365 consultant" style="width: 64px;"></div><div class="faq-author-info"><p>This tool was developed by <strong>Julie BREDECHE</strong>, a Microsoft 365 consultant with over 10 years of experience. She designed it to address a concrete need encountered in the field: quickly identifying files whose path is too long, before they block teams.</p><div class="faq-author-links"><a href="https://www.osalydconsulting.com/" target="_blank" rel="noopener"><i class="fas fa-globe"></i> osalydconsulting.com</a><a href="https://www.linkedin.com/in/juliebredeche/" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i> linkedin.com/in/juliebredeche</a></div></div></div>`,

        // Guides: one page per OneDrive error
        art_cta_title: `Spot every affected file in seconds`,
        art_cta_text: `Scan your OneDrive folder, fix files from the application and share a PDF or CSV report with your teams.`,

        errsync_h1: `OneDrive error: "the file path is too long"`,
        errsync_lead: `OneDrive refuses to sync a file and shows an error message. Here is what it means, why it appears and how to fix it.`,
        errsync_body_html: `<h2>The error message</h2><p>OneDrive shows a "Microsoft OneDrive" window with this text:</p><blockquote>"Sorry… We can't sync this item because the file path is too long."</blockquote><p>The message then tells you by how many characters the path must be shortened (for example "Shorten the file path by 3 characters and try again") and offers to set up OneDrive to sync to a location with a shorter path. The buttons "Open location", "Try again" and "Exit" are offered. (The wording may differ slightly depending on your Windows language and OneDrive version.)</p><img src="images/OneDrive400-en.webp" width="1298" height="906" loading="lazy" alt="OneDrive error message: « We can't sync this item because the file path is too long »" class="article-image" style="max-width:540px"><p class="article-caption">Example of a OneDrive error message for a path over 400 characters.</p><h2>Why this error appears</h2><p>A file's "path" is its name plus all the folders that contain it. Beyond <strong>400 characters</strong>, OneDrive cannot sync the file: it stays stuck on this error until the path is shortened.</p><p>The most common causes:</p><ul><li>folders nested over many levels;</li><li>very long folder or file names: full titles, dates, "final version" labels, the project name repeated at every level;</li><li>files coming from an old file server, where these paths were not a problem.</li></ul><h2>How to fix the error</h2><ol><li>Note the number of characters to remove shown by OneDrive.</li><li>Click "Open location" to show the file concerned.</li><li>Shorten the file name or the names of its parent folders: remove repetitions, dates and unnecessary labels.</li><li>If needed, move the folder closer to the root of your OneDrive.</li><li>Click "Try again": synchronization resumes.</li></ol><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>The message concerns one file at a time. In a large folder, other files may be affected too: it is better to find them all before fixing.</span></div>`,

        erropen_h1: `OneDrive file won't open: is the path too long?`,
        erropen_lead: `The file is synced, but it won't open from Windows File Explorer. The cause is often a path over 255 characters.`,
        erropen_body_html: `<h2>The symptom</h2><p>The file appears in your OneDrive folder, but it won't open from Windows File Explorer, or Windows shows an error window. OneDrive itself shows no sync error and does not tell you the path length, which makes diagnosis difficult without a dedicated tool.</p><img src="images/OneDrive255-en.webp" width="610" height="262" loading="lazy" alt="Windows '1 interrupted action' dialog shown for a Word document with a very long file name" class="article-image" style="max-width:480px"><p class="article-caption">Example of a Windows dialog shown for a document with a very long name.</p><h2>Why the file won't open</h2><p>Windows limits the length of a file's full path to <strong>255 characters</strong>. This path starts at the drive root and includes your Windows user name and the name of the OneDrive folder, for example:</p><code class="faq-code">C:\\Users\\julie\\OneDrive - My Company\\Projects\\2024\\Important document.docx</code><p>Between <strong>256 and 400 characters</strong>, OneDrive syncs the file without error, but Windows can no longer open it directly from File Explorer. Beyond 400 characters, synchronization itself is blocked (see <a href="onedrive-path-too-long-error.html">the "file path is too long" error</a>).</p><h2>Open the file in the meantime</h2><p>The file remains accessible online: open it from OneDrive in your browser, or from Teams.</p><h2>Fix it for good</h2><ul><li>Shorten the file name.</li><li>Shorten the names of its parent folders: remove repetitions, dates and "final version" labels.</li><li>Move the folder closer to the root of your OneDrive.</li></ul><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>Your Windows user name and the OneDrive folder name count toward the 255 characters: on another computer, the same file may open without any problem.</span></div>`,

        errsync_related_html: `<h2>Read also</h2><ul><li><a href="onedrive-file-wont-open.html">OneDrive file won't open: a path over 255 characters</a></li><li><a href="onedrive-path-length-limit.html">OneDrive path length limit: 255 and 400 characters explained</a></li></ul>`,
        erropen_related_html: `<h2>Read also</h2><ul><li><a href="onedrive-path-too-long-error.html">OneDrive error "the file path is too long": understand and fix</a></li><li><a href="onedrive-path-length-limit.html">OneDrive path length limit: 255 and 400 characters explained</a></li></ul>`,

        // Guide: OneDrive path length limit
        limits_h1: `OneDrive path length limit: 255 and 400 characters explained`,
        limits_lead: `What is the maximum path length in OneDrive? Two different limits apply. Here is how each one works and what to do when a file goes over.`,
        limits_body_html: `<h2>The short answer</h2><p>Two limits apply to a OneDrive file. They do not come from the same place and do not have the same consequences:</p><div class="faq-table-wrapper"><table class="faq-table"><thead><tr><th>Limit</th><th>Source</th><th>Consequence</th></tr></thead><tbody><tr><td><strong>400 characters</strong></td><td>OneDrive, OneDrive for work or school and SharePoint in Microsoft 365: the entire path, including the file name</td><td>🔴 The file cannot be synced (the "file path is too long" error).</td></tr><tr><td><strong>255 characters</strong></td><td>Windows ("MAX_PATH" limit: 260 characters in total, drive letter and terminating character included)</td><td>⚠️ The file syncs, but Windows and some applications cannot open it from File Explorer.</td></tr></tbody></table></div><h2>Why you read 255, 256 or 260</h2><p>The number varies depending on what is counted: the drive letter (<code>C:\\</code>), the terminating character Windows adds, or the file name only. The official Windows limit is 260 characters, terminating character included. OneDrive Path Checker flags paths over 255 characters as warnings and paths over 400 characters as critical.</p><h2>What counts toward the length</h2><ul><li><strong>For the 400-character limit:</strong> the full folder path and the file name, once decoded (a space counts as one character).</li><li><strong>For the Windows limit:</strong> the full local path from the drive root, including your Windows user name and the name of the OneDrive folder, for example <code>C:\\Users\\julie\\OneDrive - My Company\\Projects\\Document.docx</code>. The same file can therefore open on one computer and not on another.</li></ul><h2>Can the limit be raised?</h2><p>Not the 400-character limit of OneDrive and SharePoint. The Windows limit (260 characters in total), however, can be lifted for compatible applications from Windows 10 (version 1607): long path support must be enabled in the Registry (the <code>LongPathsEnabled</code> value) or with the "Enable Win32 long paths" group policy, with administrator rights. Not every application supports it, and it does not change OneDrive's 400-character limit.</p><div class="faq-tip"><i class="fas fa-lightbulb"></i><span>The simplest fix is still to shorten paths: move folders closer to the root and remove repetitions from names.</span></div><h2>Check your files</h2><p>Hunting for these paths by hand across thousands of folders is unrealistic. OneDrive Path Checker scans a OneDrive folder in seconds and lists files over 255 characters (warnings) and over 400 characters (critical), with the number of excess characters. You rename them from the application, then export a PDF or CSV report.</p>`,
        limits_related_html: `<h2>Read also</h2><ul><li><a href="onedrive-path-too-long-error.html">OneDrive error "the file path is too long": understand and fix</a></li><li><a href="onedrive-file-wont-open.html">OneDrive file won't open: a path over 255 characters</a></li></ul>`,

        faq_full_q16: `What is the maximum path length in OneDrive?`,
        faq_full_a16_html: `<p>OneDrive and SharePoint limit the entire path of a file, name included, to <strong>400 characters</strong>. Windows adds its own limit of <strong>255 characters</strong> ("MAX_PATH": 260 in total) for opening files from File Explorer.</p><p>Learn more: <a href="onedrive-path-length-limit.html">OneDrive path length limit: 255 and 400 characters explained</a>.</p>`,

        footer_guides_title: `Guides`,
        footer_guide_limit: `OneDrive path length limit`,
        footer_guide_sync: `"File path is too long" error`,
        footer_guide_open: `File won't open`,

        // Contact page
        contact_h1: 'Contact us',
        contact_subtitle_html: 'A question or comment? <br>We\'re here to help.',
        contact_card1_title: 'Write to us',
        contact_card1_desc: 'For any general inquiry or technical support',
        contact_card2_title: 'Response time',
        contact_card2_desc: 'We generally respond within',
        contact_card2_highlight: '24 to 48 hours',
        contact_card3_title: 'Quick answers',
        contact_card3_desc: 'Check our FAQ for the most frequently asked questions',
        contact_card3_link: 'See the FAQ',
        contact_include_h2: 'To best handle your support requests:',
        contact_item1_html: '<strong>Describe your environment</strong> - Example: Windows 11 / OneDrive folder with 120,000 files / version 1.1.0.0',
        contact_item2_html: '<strong>Provide a precise description</strong> - At what step do you encounter a problem? What error messages do you see?',
        contact_item3_html: '<strong>Provide screenshots</strong> — If you\'re reporting a bug, visuals help us understand and reproduce the problem',

        // Meta
        sales_email_subject: 'Enterprise Quote Request - OneDrive Path Checker',
        sales_email_body: 'Organization name:\nNumber of workstations:\nDesired timeline:',
    }
};

