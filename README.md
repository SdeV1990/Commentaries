# Тестовое задание

## Создать форму для отправки комментариев с полями:

· name имя

· text комментарий

Все поля обязательные для заполнения
Вывести список комментариев
						
При клике на кнопку “Показать еще” - подгружать следующие комментарии
Если больше нет комментариев, кнопка “Показать еще” должна быть скрыта
Помимо кнопки “Показать еще” реализовать навигацию по комментариям с помощью пагинации
						
Запросы к апи отправлять на роуты:
## METHODS:
· GET https://jordan.ashton.fashion/api/goods/30/comments 
· POST https://jordan.ashton.fashion/api/goods/30/comments

## Отправка данных в формате JSON
						
В качестве базы для приложения использовать create-react-app
** Важно: реализация на React **

### От себя

Решил реализовать без Axios, Redux. Только через http requests.