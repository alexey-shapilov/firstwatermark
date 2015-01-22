<?php
ob_start();
?>
    <!-- ===================================== CONTAINER =====================================-->
    <div class="wrapper">
        <!-- --------------------------------------- place img-->
        <section class="workspace">
            <div class="picture">
                <h1 class="picture__title"></h1>
                <div class="picture__body"><img class="picture__upload"><img class="picture__watermark"></div>
            </div>
        </section>
        <!-- --------------------------------------- adjustment-->
        <section class="workspace">
            <div class="adjust">
                <div class="adjust__title">
                    <h2 class="text">Настройки</h2>
                </div>
                <!-- upload files-->
                <div class="adjust__raw">
                    <div class="upload">
                        <label for="upload_picture" class="upload__title">Исходное изображежние</label>
                        <input id="upload_picture" type="file" name="upload" class="upload__field">
                    </div>
                    <div class="upload">
                        <label for="upload_watermark" class="upload__title">Водяной знак</label>
                        <input id="upload_watermark" type="file" name="upload" class="upload__field">
                    </div>
                </div>
                <!-- place watermark-->
                <div class="adjust__raw">
                    <div class="place">
                        <h3 class="place__title">Положение</h3>
                        <div class="place__body">
                            <div class="grid">
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                                <div class="grid__item">grid</div>
                            </div>
                            <div class="coord">
                                <div class="coord__raw">
                                    <label for="x_coordinate" class="coord__title">X</label>
                                    <input id="x_coordinate" type="text" class="coord__field">
                                    <div class="coord__buttons">
                                        <input type="button" value="∧" class="coord__arrow coord__arrow_up">
                                        <input type="button" value="∨" class="coord__arrow coord__arrow_down">
                                    </div>
                                </div>
                                <div class="coord__raw">
                                    <label for="y_coordinate" class="coord__title">Y</label>
                                    <input id="y_coordinate" type="text" class="coord__field">
                                    <div class="coord__buttons">
                                        <input type="button" value="∧" class="button__arrow button__arrow_up">
                                        <input type="button" value="∨" class="button__arrow button__arrow_down">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- transparent-->
                <div class="adjust__raw">
                    <div class="transparent">
                        <h3 class="transparent__title">Прозрачность</h3>
                        <div class="transparent__body"></div>
                    </div>
                </div>
                <!-- download result-->
                <div class="adjust__raw">
                    <form class="form">
                        <div class="form__coll">
                            <input type="reset" value="Сброс" class="form__button">
                        </div>
                        <div class="form__coll">
                            <input type="button" value="Скачать" class="form__button form__download-button">
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
<?php
$title = 'watermark';
$content = ob_get_clean();