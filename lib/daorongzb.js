'use babel';

import DaorongzbView from './daorongzb-view';
import { CompositeDisposable } from 'atom';

export default {

  daorongzbView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.daorongzbView = new DaorongzbView(state.daorongzbViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.daorongzbView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'daorongzb:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.daorongzbView.destroy();
  },

  serialize() {
    return {
      daorongzbViewState: this.daorongzbView.serialize()
    };
  },

  toggle() {
    console.log('Daorongzb was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
