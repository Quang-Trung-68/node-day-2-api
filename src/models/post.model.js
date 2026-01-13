const { loadDB, saveDB } = require("@root/utils/jsonDB");
const { v4: uuid } = require("uuid");

const RESOURCE = "posts";

function create(data) {
  const rootData = loadDB(RESOURCE);

  const newData = {
    id: uuid(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  rootData.push(newData);
  saveDB(RESOURCE, rootData);

  return newData;
}

function getOne(id) {
  const rootData = loadDB(RESOURCE);

  const data = rootData.find((_data) => _data.id === id);
  if (!data) return null;

  return data;
}

function getAll() {
  const rootData = loadDB(RESOURCE);

  return rootData;
}

function update(id, data) {
  const { title, content } = data;

  const rootData = loadDB(RESOURCE);
  const tempData = [...rootData];

  const updatedData = tempData.find((_data) => _data.id === id);
  const updatedDataIndex = tempData.findIndex((_data) => _data.id === id);
  if (!updatedData) return null;

  const newData = {
    ...updatedData,
    title,
    content,
    updatedAt: new Date().toISOString(),
  };

  tempData[updatedDataIndex] = newData;
  saveDB(RESOURCE, tempData);

  return newData;
}

function destroy(id) {
  const rootData = loadDB(RESOURCE);
  let tempData = [...rootData];
  const destroyedData = tempData.find((_data) => _data.id === id);
  if (!destroyedData) return null;

  tempData = tempData.filter((_data) => _data.id !== id);

  saveDB(RESOURCE, tempData);

  return destroyedData;
}

module.exports = { getOne, getAll, create, update, destroy };
