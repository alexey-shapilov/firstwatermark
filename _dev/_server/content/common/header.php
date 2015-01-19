<?php
if (!defined('INIT')) exit('No direct script access allowed');
?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?></title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/png" href="/favicon.png"/>

    <!-- build:css(_dev/_server/content/common) /css/style.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <link rel="stylesheet" href="../../../_sass/style.css"/>
    <!-- endbuild -->
</head>
<body class="page-<?= $query[0] ?>">
<div class="container">
    <!-- ===================================== HEADER =====================================-->
    <header class="header"></header>
