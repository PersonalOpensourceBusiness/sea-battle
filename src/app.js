import { Model } from './Model/Model';
import { View } from './View/View';
import { Controller } from './Controller/Controller';

let model = new Model();
let view = new View(model);
let controller = new Controller(model, view);

model.init();
controller.init();