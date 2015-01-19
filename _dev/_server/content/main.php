<?php
ob_start();
echo '$content';
$content = ob_get_clean();