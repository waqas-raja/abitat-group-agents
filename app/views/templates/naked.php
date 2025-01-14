<?php
    if (!file_exists(__DIR__ . '/../../prodigio-ai.lic'))
        die('Fatal error: licenza mancante, contattare il fornitore del servizio');
    $PAI_LICENSE = file_get_contents(__DIR__ . '/../../prodigio-ai.lic');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="noindex, nofollow">
    <title><?= $title ? (getenv("APPLICATION_NAME") . "  - " . $title) : "CRM" ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/24.2.3/css/dx.common.css">
    <link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/24.2.3/css/dx.light.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn3.devexpress.com/jslib/24.2.3/js/dx-quill.min.js"></script>
    <script src="https://cdn3.devexpress.com/jslib/24.2.3/js/dx.all.js"></script>
    <script src="https://cdn3.devexpress.com/jslib/24.2.3/js/localization/dx.messages.it.js"></script>
    <script src="https://cdn3.devexpress.com/jslib/24.2.3/js/jszip.min.js"></script>
    <link rel="stylesheet" href="/static/css/style.css">
    <link rel="icon" type="image/png" href="/static/imgs/favicon.png">
    <script>
        window.name="__main__";
        DevExpress.config({ licenseKey: '<?= $PAI_LICENSE ?>' });
        DevExpress.localization.loadMessages(DevExpress.localization.it);
        DevExpress.localization.locale("it");
    </script>
</head>
<body>
    <div class="template_naked_container">
        <?= $content ?>
    </div>
    <script src="/static/js/app.js"></script>
</body>
</html>
