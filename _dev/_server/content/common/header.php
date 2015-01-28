<?php
if (!defined('INIT')) exit('No direct script access allowed');
?>
<!DOCTYPE html><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <![endif]-->
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?= $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/ico" href="/favicon.ico"/>
    <link rel="SHORTCUT ICON" type="image/x-icon" href="/favicon.ico">

    <!-- build:css css/vendor.css-->
    <!-- bower:css-->
    <!-- endbower-->
    <!-- endbuild-->

    <!-- build:css(_dev/_jade/_pages) /css/style.css-->
    <link rel="stylesheet" href="../../_sass/style.css" type="text/css" media="screen">
    <!-- endbuild-->
</head>
<body class="page-<?= $query[0] ?>">
<!--[if lt IE 7]>
<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->
<div class="container">
    <!-- ===================================== HEADER =====================================-->
    <header class="header"></header>
