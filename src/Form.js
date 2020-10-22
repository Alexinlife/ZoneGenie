import React from 'react';
import Loop from './Loop';
import './style.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * 1838304 - Alex Lajeunesse
 * 
 * Form
 * 
 * Formulaire en français.
 * Gère le lancement de l'algorithme génétique selon les paramètres demandés
 */
class Form extends React.Component {

    /**
     * Alex Lajeunesse
     * 
     * Constructeur de Loop
     * 
     * @param props
     * @returns null
     */
    constructor(props) {
        super(props);
        this.state = {
            nbNoeuds: undefined,
            nbGroupes: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Alex Lajeunesse
     * 
     * Assigne les valeurs insérées dans le formulaire au state
     * 
     * @param {*} event 
     */
    handleSubmit(event) {
        event.preventDefault();
        let noeuds = event.target.nbNoeuds.value;
        let groupes = event.target.nbGroupes.value;
        this.setState({
            nbNoeuds: noeuds,
            nbGroupes: groupes
        });
        console.log(this.state.nbNoeuds);
        console.log(this.state.nbGroupes);
    }

    /**
     * Alex Lajeunesse
     * 
     * Méthode servant à render le composant de Form
     * 
     * @params null
     * @returns null
     */
    render() {
        return (
            <div className="content">
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        className="field"
                        id="nbNoeuds"
                        label="Nombre de noeuds"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className="field"
                        id="nbGroupes"
                        label="Nombre de groupes"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <br />
                    <Button variant="contained" type="submit">Lancer la génération</Button>
                </form>
                {this.state.nbNoeuds && <Loop nbNoeuds={this.state.nbNoeuds} nbGroupes={this.state.nbGroupes}/>}
            </div>
        );
    }
}

export default Form;