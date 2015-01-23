<?php
ob_start();
?>
    <!-- ===================================== CONTAINER =====================================-->
    <div class="content">
        <div class="wrapper">
            <!-- --------------------------------------- Picture-->
            <section class="workspace workspace_left">
                <div class="picture">
                    <h1 class="picture__title">Генератор водяных знаков</h1>
                    <div class="picture__body">
                        <div class="picture__images">
                            <div class="picture__wrapper"><img class="picture__watermark"><img class="picture__upload">
                                <div class="picture__bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- --------------------------------------- adjustment-->
            <section class="workspace workspace_right">
                <div class="adjust">
                    <div class="adjust__title">
                        <h2 class="text">Настройки</h2>
                    </div>
                    <!-- upload files-->
                    <div class="adjust__body">
                        <div class="adjust__raw">
                            <div class="upload">
                                <div class="upload__item">
                                    <label for="upload_picture" class="upload__title">Исходное изображежние</label>
                                    <div class="upload__raw">
                                        <input id="upload_picture" type="file" name="upload" class="upload__field-file">
                                        <input type="text" name="upload" class="upload__field">
                                        <button type="file" name="upload" class="upload__button"></button>
                                    </div>
                                </div>
                                <div class="upload__item">
                                    <label for="upload_watermark" class="upload__title">Водяной знак</label>
                                    <div class="upload__raw">
                                        <input id="upload_watermark" type="file" name="upload" class="upload__field-file">
                                        <input type="text" name="upload" class="upload__field">
                                        <button type="file" name="upload" class="upload__button"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- place watermark-->
                        <div class="adjust__raw">
                            <div class="place">
                                <h3 class="place__title">Положение</h3>
                                <div class="place__body">
                                    <!-- grid-->
                                    <div class="grid">
                                        <div class="grid__item grid__item_1"></div>
                                        <div class="grid__item grid__item_2"></div>
                                        <div class="grid__item grid__item_3"></div>
                                        <div class="grid__item grid__item_4"></div>
                                        <div class="grid__item grid__item_5"></div>
                                        <div class="grid__item grid__item_6"></div>
                                        <div class="grid__item grid__item_7"></div>
                                        <div class="grid__item grid__item_8"></div>
                                        <div class="grid__item grid__item_9"></div>
                                    </div>
                                    <!-- coordinate-->
                                    <div class="coord">
                                        <div class="coord__raw">
                                            <div class="coord__coll">
                                                <label for="x_coordinate" class="coord__title">X</label>
                                            </div>
                                            <div class="coord__coll">
                                                <input id="x_coordinate" type="text" class="coord__field">
                                            </div>
                                            <div class="coord__coll">
                                                <input id="x_coordinate_up" type="button" value="∧" class="coord__arrow coord__arrow_up">
                                                <input id="x_coordinate_down" type="button" value="∨" class="coord__arrow coord__arrow_down">
                                            </div>
                                        </div>
                                        <div class="coord__raw">
                                            <div class="coord__coll">
                                                <label for="y_coordinate" class="coord__title">Y</label>
                                            </div>
                                            <div class="coord__coll">
                                                <input id="y_coordinate" type="text" class="coord__field">
                                            </div>
                                            <div class="coord__coll">
                                                <input id="y_coordinate_up" type="button" value="∧" class="coord__arrow coord__arrow_up">
                                                <input id="y_coordinate_down" type="button" value="∨" class="coord__arrow coord__arrow_down">
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
                                <div class="transparent__body">
                                    <div class="transparent__item"></div>
                                </div>
                            </div>
                        </div>
                        <!-- download result-->
                        <div class="adjust__raw">
                            <form class="form">
                                <div class="form__coll form__coll_reset">
                                    <input type="reset" value="Сброс" class="form__button form__button_reset">
                                </div>
                                <div class="form__coll form__coll_submit">
                                    <input type="submit" value="Скачать" class="form__button form__button_submit">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
<?php
$title = 'watermark';
$content = ob_get_clean();