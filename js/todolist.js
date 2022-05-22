"use strict";

const putBtn = document.getElementById("putBtn");
const text = document.getElementById("ToDo");
const list = document.getElementById("list");
const doneList = document.getElementById("doneList");
const form = document.getElementById("form");
const delAll = document.getElementById("removeAll");
const delChecked = document.getElementById("removeChecked");
const checkAll = document.getElementById("checkAll");
const todoDim = document.querySelector(".dim");
const checkRemoveAll = document.querySelector(".checkRemove");
const btnWrap = document.getElementById("buttonWrap");
const setTodolist = `todo${sessionStorage.getItem("login")}`;
const setDonelist = `done${sessionStorage.getItem("login")}`;

let listLength, cTarget, checked;
let todoData, itemsArray, doneData, doneArray;

// todolist localstorage
if (sessionStorage.getItem("login"))
	setLocalTodo(sessionStorage.getItem("login"));

function setLocalTodo(user) {
	todoData = JSON.parse(localStorage.getItem("todo" + user));
	itemsArray = todoData ? todoData : [];
	localStorage.setItem("todo" + user, JSON.stringify(itemsArray));
	if (todoData == null) todoData = [];

	todoData.forEach(function (text, listLength) {
		createTagsTodo("todoList", "c", text, list, listLength + 1);
	});

	// donelist localstorage
	doneData = JSON.parse(localStorage.getItem("done" + user));
	doneArray = doneData ? doneData : [];
	localStorage.setItem("done" + user, JSON.stringify(doneArray));
	if (doneData == null) doneData = [];

	doneData.forEach(function (text, listLength) {
		createTagsTodo("doneList on", "cD", text, doneList, listLength + 1);
	});
}

// add todolist
form.addEventListener("submit", addList);

function addList(e) {
	e.preventDefault();

	if (!text.value || text.value.trim() == "") {
		alert("Please write list!");
		text.focus();
		text.value = "";
		return false;
	}
	itemsArray.push(text.value);
	listLength = list.children.length + 1;

	setItems();
	createTagsTodo("todoList", "c", text.value, list, listLength + 1);
	text.value = "";
}

//checkbox test
function checkOne(allList) {
	allList.forEach(function (ele) {
		ele.firstChild.addEventListener("click", function () {
			checked = document.querySelectorAll(".checkMark:checked").length;
			const sumList = list.children.length + doneList.children.length;

			if (!this.checked) testCheck(false);
			if (checked == sumList) testCheck(true);
		});
	});
	if (checked !== list.children.length) testCheck(false);
}

//list 삭제하기
function removeCurrentList(removeBtn) {
	removeBtn.addEventListener("click", function (e) {
		cTarget = e.currentTarget.parentElement;
		cTarget.remove();

		const sumLength = list.children.length + doneList.children.length;
		checked = document.querySelectorAll(".checkMark:checked");

		if (sumLength == 0) testCheck(false);
		else if (checked.length == sumLength) testCheck(true);

		targetRemoveStorage1(cTarget);
		idReset();
	});
}

//donelist 보내기
function toggleCheck(doneBox) {
	doneBox.addEventListener("click", function (e) {
		cTarget = e.currentTarget.parentElement;
		cTarget.classList.toggle("on");

		if (cTarget.classList[1] == "on") {
			sendToDone("doneList on", doneList);
		} else {
			sendToDone("todoList", list);
		}

		function sendToDone(cName, listname) {
			cTarget.className = cName;
			listname.append(cTarget);
		}
		targetRemoveStorage2();
		idReset();
	});
}

//etc function
function testCheck(set) {
	checkAll.checked = set;
}

// localstorage 배열 저장 삭제
function setItems() {
	localStorage.setItem(setTodolist, JSON.stringify(itemsArray));
}
function setDone() {
	localStorage.setItem(setDonelist, JSON.stringify(doneArray));
}

function resetStorage(array, ele) {
	for (let i = 0; i < ele.length; i++) {
		let aa = ele[i].innerText;
		array.push(aa);
	}
}

function targetRemoveStorage1(cTarget) {
	let allTodo = document.querySelectorAll("#list li");
	let allDone = document.querySelectorAll("#doneList li");

	if (cTarget.className.substr(0, 1) == "t") {
		itemsArray = [];
		resetStorage(itemsArray, allTodo);
		setItems();
	}
	if (cTarget.className.substr(0, 1) == "d") {
		doneArray = [];
		resetStorage(doneArray, allDone);
		setDone();
	}
}
function targetRemoveStorage2() {
	let allTodo2 = document.querySelectorAll("#list li");
	let allDone2 = document.querySelectorAll("#doneList li");

	doneArray = [];
	resetStorage(doneArray, allDone2);
	setDone();
	itemsArray = [];
	resetStorage(itemsArray, allTodo2);
	setItems();
}

//idReset
function idReset() {
	const alltodoList = document.querySelectorAll("#list li"),
		alltodoListLength = alltodoList.length,
		allCheckBtn = document.querySelectorAll("#list li .checkMark"),
		allLabel = document.querySelectorAll("#list li .label");

	for (let i = 0; i < alltodoListLength; i++) {
		allCheckBtn[i].id = "c" + (i + 1);
		allLabel[i].setAttribute("for", "c" + (i + 1));
	}

	const alldoneList = document.querySelectorAll("#doneList li"),
		alldoneListLength = alldoneList.length,
		allCheckBtn2 = document.querySelectorAll("#doneList li .checkMark"),
		allLabel2 = document.querySelectorAll("#doneList li .label");
	for (let i2 = 0; i2 < alldoneListLength; i2++) {
		allCheckBtn2[i2].id = "cD" + (i2 + 1);
		allLabel2[i2].setAttribute("for", "cD" + (i2 + 1));
	}
}
function createTagsTodo(listClass, checkId, innTxt, ele, listLength) {
	const plusList = makeEle({
		tag: "li",
		class: listClass,
	});

	const checkBox = makeEle({
		tag: "input",
		type: "checkbox",
		class: "checkMark",
		id: checkId + listLength,
	});

	const label = makeEle({
		tag: "label",
		class: "label",
		html: "<span></span>",
	});
	label.setAttribute("for", checkId + listLength);

	const createText = makeEle({
		tag: "div",
		class: "innerText",
		txtCont: innTxt,
	});
	const doneBox = makeEle({
		tag: "span",
		class: "doneBox",
		html: "<i class='fas fa-check'></i>",
	});

	const removeBtn = makeEle({
		tag: "button",
		type: "button",
		class: "removeBtn",
		html: "<i class='fas fa-times'></i>",
	});
	const editText = makeEle({
		tag: "button",
		type: "button",
		class: "editBtn",
		html: "<i class='far fa-edit'></i>",
	});

	ele.append(plusList);
	plusList.append(checkBox, label, createText, doneBox, editText, removeBtn);

	const allList = document.querySelectorAll(".list li");

	checkOne(allList);
	removeCurrentList(removeBtn);
	toggleCheck(doneBox);
	createEditor(editText);
}

function createEditor(editText) {
	editText.addEventListener("click", function (e) {
		cTarget = e.currentTarget.parentElement.children[2];
		const editbox = makeEle({
			tag: "input",
			type: "text",
			class: "editBox",
		});
		editbox.setAttribute("maxLength", "20");
		const cancleBtn = makeEle({
			tag: "button",
			type: "button",
			class: "cancle",
			html: "<i class='fas fa-times'></i>",
		});
		const rightCheck = makeEle({
			tag: "button",
			type: "submit",
			class: "submit",
			html: "<i class='far fa-thumbs-up'></i>",
		});

		editText.replaceWith(rightCheck);
		cTarget.append(editbox, cancleBtn);
		editbox.focus();

		rightCheck.addEventListener("click", function (e) {
			editValueCheck(e);
		});
		cancleBtn.addEventListener("click", cancleEdit);

		editbox.addEventListener("keyup", function (e) {
			switch (e.keyCode) {
				case 13:
					rightCheck.click();
					break;
				case 27:
					cancleEdit();
					break;
			}
		});

		function editValueCheck(e) {
			cTarget = e.currentTarget.parentElement;

			if (!editbox.value || editbox.value.trim() == "") {
				alert("Please write text to edit!");
				editbox.value = "";
				editbox.focus();
				return false;
			}
			cTarget.children[2].innerText = editbox.value;
			editbox.remove();
			e.currentTarget.replaceWith(editText);
			targetRemoveStorage1(cTarget);
		}

		function cancleEdit() {
			editbox.remove();
			cancleBtn.remove();
			rightCheck.replaceWith(editText);
		}
	});
}

function makeEle(data) {
	let makeTags = null;
	if (data.tag) {
		makeTags = document.createElement(data.tag);
	}
	if (makeTags && data.class) {
		makeTags.className = data.class;
	}
	if (makeTags && data.id) {
		makeTags.id = data.id;
	}
	if (makeTags && data.html) {
		makeTags.innerHTML = data.html;
	}
	if (makeTags && data.txtCont) {
		makeTags.textContent = data.txtCont;
	}
	if (makeTags && data.type) {
		makeTags.type = data.type;
	}

	return makeTags;
}
