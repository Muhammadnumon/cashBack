'use strict';
const rootEl = document.getElementById('root');
const formEl = document.createElement('form');
formEl.dataset.id = ('purchase-form');
rootEl.appendChild(formEl);

const nameEl = document.createElement('input');
nameEl.dataset.input = ('name');
formEl.appendChild(nameEl);

const priceEl = document.createElement('input');
priceEl.dataset.input = ('price');
priceEl.type = ('number');
formEl.appendChild(priceEl);

const buttonEl = document.createElement('button');
buttonEl.dataset.action = ('add');
buttonEl.textContent = 'Добавить';
formEl.appendChild(buttonEl);

const listEl = document.createElement('ul');
listEl.dataset.id = ('purchases-list');
rootEl.appendChild(listEl);

const totalEl = document.createElement('div');
totalEl.textContent = ('Итоговый кэшбек: ');
rootEl.appendChild(totalEl);

const cashbackTotalEl = document.createElement('span');
cashbackTotalEl.dataset.id = ('total-cashback');
cashbackTotalEl.textContent = '0 с.';
totalEl.appendChild(cashbackTotalEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

let nextId = 1;
const purchases = [];
formEl.onsubmit = evt => {
    evt.preventDefault();
    errorEl.textContent = '';
    let error = null;
    const name = nameEl.value.trim();
    if (name === '') {
        error = 'Значение не может быть пустым';
        errorEl.textContent = error;
        nameEl.focus();
        return;
    }
    if (priceEl.value <= 0) {
        error = 'Цена должна быть больше нуля';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }
    if (isNaN(priceEl.value)) {
        error = 'Цена должна быть числом';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }
    //const priceValue = Number(priceEl.value);
    const purchase = {
        id: nextId++,
        name,
        price: priceEl.value,
    };
    purchases.push(purchase);
    formEl.reset();
    nameEl.focus();
    let total = 0;
    let cashback = 0;
    const nine=9;
    const halfOne=0.5;
    const two=2;
    const rowEl = document.createElement('li');
    rowEl.dataset.purchaseId = purchase.id;
    if (purchase.price < 100 && purchase.price >nine) {
        cashback = (purchase.price * (halfOne / 100));
        total = purchases.reduce((prev, curr) => prev + Number(curr.price), 0);
        rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. (кэшбек - ${cashback} с.)`;
        listEl.insertBefore(rowEl, listEl.firstElementChild);
        cashbackTotalEl.textContent = `${(total * (halfOne / 100)).toFixed(two)} с.`;
        
    } else {
        cashback = Math.floor(((purchase.price * 100) * (halfOne/ 100)) / 100);
        total = purchases.reduce((prev, curr) => prev + Number(curr.price), 0);
        rowEl.textContent = `${name} на сумму ${purchase.price} с. (кэшбек - ${cashback} с.)`;
        listEl.insertBefore(rowEl, listEl.firstElementChild);
        cashbackTotalEl.textContent = `${Math.floor(((total * 100) * (halfOne / 100)) / 100)} с.`;
    }
     console.log(cashbackTotalEl.textContent);
    return;


};