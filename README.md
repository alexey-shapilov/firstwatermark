# firstwatermark

[Сервис наложения водяного знака](http://cx62241.tmweb.ru)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/alexey-shapilov/firstwatermark?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Сервис предназначен для создания водяного знака на изображении.

## Команда разработчиков

Руководитель команды
  * Шапилов Алексей Юрьевич

Члены команды
  * Конохов Арсений Александрович
  * Мухин Борис Леонидович
  * Шилка Юрий Сергеевич

## Сборка сервиса

Используемые технологии и инструменты
  * [HTML5](http://www.w3.org/TR/html5/)
  * [Jade](http://jade-lang.com/)
  * [bem-naming](http://ru.bem.info/tools/bem/bem-naming/) классов
  * [CSS3](http://www.w3.org/Style/CSS/) препроцессор [SASS](http://sass-lang.com/) (для работы необходим [Ruby](https://www.ruby-lang.org/ru/))
  * Инструмент для компиляции [SASS](http://sass-lang.com/) - [compass](http://compass-style.org/)
  * [gulp](http://gulpjs.com/) (для работы необходим [Node.js](http://nodejs.org/))
    * плагины для gulp:
      * [gulp-compass](https://github.com/appleboy/gulp-compass.git)
      * [gulp-if](https://github.com/robrich/gulp-if.git)
      * [gulp-jade](https://github.com/phated/gulp-jade.git)
      * [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins.git)
      * [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css.git)
      * [gulp-rename](https://github.com/hparra/gulp-rename.git)
      * [gulp-uglify](https://github.com/terinjokes/gulp-uglify.git)
      * [rimraf](https://github.com/isaacs/rimraf.git)
      * [wiredep](https://github.com/taptapship/wiredep.git)

Необходимые инструменты для компиляции проекта:
  * [Node.js](http://nodejs.org/)
  * [Ruby](https://www.ruby-lang.org/ru/)
  * [RubyGems] (https://rubygems.org/)
  * [sass](http://sass-lang.com/)
  * [compass](http://compass-style.org/)
  * [git](http://git-scm.com/)

Подготовка к сборке:
  * Клонировать репозиторий
```
git clone
```
  * в папке с проектом запустить
    ```
npm install (установка зависимотсей node.js)
bower install (установка зависимостей bower)
```
  
Сборка проекта:
  ```
  gulp build-with-php (сборка проекта с серверной частью на PHP)
  gulp build-without-php (сборка проекта без серверной части)
  ```
  Результат сборки находится в папке <b><i>app</i></b>