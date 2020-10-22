import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';
import Graph from 'react-graph-vis';
import MyGraph from './Graph';

/**
 * 1838304 - Alex Lajeunesse
 * 
 * Loop
 * 
 * Boucle en français.
 * Élément principal de l'algorithme génétique.
 * Crée, note, sélectionne et opère le génome à l'aide d'autres classes.
 */
class Loop extends React.Component {

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
        this.graphs = [];
        this.population = 10;
        if (this.props.nbNoeuds != null && this.props.nbGroupes != null) {
            this.loop();
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Fait la boucle de l'algorithme génétique jusqu'à ce qu'il y ait un gagnant
     * Indique à la classe ensuite le graphe gagnant
     * 
     * @params null
     * @returns null
     */
    loop() {
        var selectionTerminee = false;
        var nbGenerations = 0;
        var gagnant;

        this.createPopulation(this.props.nbNoeuds, this.props.nbGroupes);

        // Tant qu'il n'y a pas de gagnant sélectionné
        while (!selectionTerminee) {
            nbGenerations++;
            this.evaluatePopulation();
            // Recherche de gagnants à partir du haut de la liste
            for (let index = 0; index < this.graphs.length; index++) {
                if (this.graphs[index].grade === 100) {
                    selectionTerminee = true;
                    gagnant = index;
                }
            }
            // S'il n'y a pas de gagnant, reproduire et faire muter la population
            if (!selectionTerminee) {
                this.reproducePopulation();
                this.mutateChildren();
            }
        }
        // Définition du gagnant à la fin de la boucle
        this.gagnant = gagnant;
        this.nbGenerations = nbGenerations
        console.log("nombre de générations : " + nbGenerations);
    }

    /**
     * Alex Lajeunesse
     * 
     * Crée une population de départ
     * 
     * @param nbVertices Le nombre de noeuds que chaque instance doit contenir
     * @param nbGroups Le nombre de groupes présents dans le graphe
     *                 Peut créer des populations inadéquates si trop bas
     * @returns null
     */
    createPopulation(nbVertices, nbGroups) {
        this.nbVertices = nbVertices;
        this.nbGroups = nbGroups;

        // Création d'une population initiale de 10
        for (let i = 0; i < this.population; i++) {
            this.graphs[i] = new MyGraph();
            var group = -1;

            // Création des noeuds avec le nombre de groupes prescrits
            for (let y = 0; y < nbVertices; y++) {
                if (nbVertices >= nbGroups && group < nbGroups - 1) {
                    group++;
                } else {
                    // Nombre aléatoire de 0 jusqu'au nombre de groupes prescrit
                    group = Math.floor(Math.random() * nbGroups);
                }
                this.graphs[i].createVertex(group);
            }

            // Création aléatoire des arêtes pour chaque noeud
            for (let y = 0; y < this.graphs[i].vertices.length; y++) {
                // Tous les noeuds ont la chance d'être connectés à 2 autres noeuds du graphe
                // Toutefois, la méthode Graph.connectVertices() vérifie déjà les liens doubles
                var nbEdges = Math.floor((Math.random() * 2) + 1);

                for (let u = 0; u < nbEdges; u++) {
                    var to = Math.floor(Math.random() * this.graphs[i].vertices.length);
                    this.graphs[i].connectVertices(y, to);
                }
            }
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Évalue la population selon le nombre de noeuds connectés ayant le même groupe
     * Puis, elle classe les graphes en ordre décroissant de note
     * 
     * @params null
     * @returns null
     */
    evaluatePopulation() {
        // Pour tous les graphes de la population
        for (let i = 0; i < this.graphs.length; i++) {
            var currentGraph = this.graphs[i];
            currentGraph.grade = currentGraph.edges.length;

            // Évaluation négative selon le nombre d'arêtes ayant deux noeuds de même groupe
            for (let y = 0; y < currentGraph.edges.length; y++) {
                var currentEdge = currentGraph.edges[y];
                if (currentGraph.findVertex(currentEdge.from).group === currentGraph.findVertex(currentEdge.to).group) {
                    currentGraph.grade--;
                }
            }

            // Conversion de la note en pourcentage
            currentGraph.grade = (currentGraph.grade / currentGraph.edges.length) * 100;
        }
        // Triage de la population de la plus haute note à la plus basse
        this.graphs.sort((a, b) => b.grade - a.grade);
    }

    /**
     * Alex Lajeunesse
     * 
     * Reproduit les deux premiers graphes pour créer des descendances
     * 
     * @params null
     * @returns null
     */
    reproducePopulation() {
        var enfant;
        var groupeAleatoire;
        var rndLigne;
        var pere = this.graphs[0];
        var mere = this.graphs[1];
        var nbGroupesMere = Math.floor(this.nbVertices / 2);

        // Pour chaque enfant de la population
        for (let i = 0; i < this.population - 2; i++) {
            enfant = new MyGraph();
            // Copie des noeuds et des arêtes du père dans l'enfant
            for (let y = 0; y < this.nbVertices; y++) {
                enfant.createVertex(pere.vertices[y].group);
            }
            for (let y = 0; y < pere.edges.length; y++) {
                enfant.connectVertices(pere.edges[y].from, pere.edges[y].to);
            }

            // Modification aléatoire des groupes de l'enfant selon ceux de la mère
            while (nbGroupesMere > 0) {
                groupeAleatoire = Math.floor(Math.random() * this.nbVertices);
                enfant.vertices[groupeAleatoire].group = mere.vertices[groupeAleatoire].group;
                nbGroupesMere--;
                this.graphs[i + 2] = enfant;
            }

            // Fix pour lorsque le nombre de groupes est inférieur à 3
            // Le logiciel à tendance à boucler très longtemps pour trouver la solution
            // Crée un graphe ligne si les conditions sont réunies
            rndLigne = Math.floor(Math.random() * 250);
            if (this.nbGroups <= 3 && rndLigne === 0) {
                enfant.edges = [];
                for (let y = 0; y < enfant.vertices.length; y++) {
                    enfant.connectVertices(y, y + 1);
                }
            }
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Change la couleur de certains noeuds aléatoirement dans les descendances
     * 
     * @param null
     * @returns null
     */
    mutateChildren() {
        var quartDesNoeuds = Math.floor(this.nbVertices * 0.25);
        var nbMutations;
        var noeudMutation;
        var noeudsMutes;
        var procederMutation;
        var groupeMutation;

        // Pour tous les graphes descendants du père et de la mère
        for (let i = 2; i < this.graphs.length; i++) {
            nbMutations = Math.floor(Math.random() * quartDesNoeuds);
            noeudsMutes = []

            // Tant qu'il y a encore des mutations à effectuer sur le descendant
            while (nbMutations > 0) {
                // Sélection aléatoire  du noeud du descendant à muter
                noeudMutation = Math.floor(Math.random() * (this.graphs[i].vertices.length));
                procederMutation = true;

                // Vérifie si le noeud sélectionné pour la mutation a déjà été muté
                for (let y = 0; y < noeudsMutes.length; y++) {
                    if (noeudsMutes[y] === noeudMutation) {
                        procederMutation = false;
                    }
                }
                // Change le groupe du noeud et l'ajoute dans la liste des noeuds mutés
                if (procederMutation) {
                    do {
                        groupeMutation = Math.floor(Math.random() * this.nbGroups);
                    } while (this.graphs[i].vertices[noeudMutation].group === groupeMutation);

                    this.graphs[i].vertices[noeudMutation].group = Math.floor(Math.random() * this.nbGroups);
                    noeudsMutes.push(noeudMutation);
                    nbMutations--;
                }
            }
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Méthode servant à render le composant de Loop
     * 
     * @params null
     * @returns null
     */
    render() {
        // S'il y a un graphe gagnant, affiche-le
        if (this.gagnant != null) {
            const graph = {
                nodes: this.graphs[this.gagnant].vertices,
                edges: this.graphs[this.gagnant].edges
            };

            // Gère les options du graphe tels que la physique l'identification des noeuds, etc.
            const options = {
                layout: {
                    hierarchical: false
                },
                nodes: {
                    shape: "dot",
                    font: {
                        color: "#000000",
                        vadjust: -40
                    },
                },
                edges: {
                    color: "#000000",
                    arrows: {
                        to: false
                    }
                },
                height: "500px"
            };

            return (
                <div>
                    <p className="generation">Nombre de générations : {this.nbGenerations}</p>
                    <Graph
                        graph={graph}
                        options={options}
                        getNetwork={(network) => {
                            //  if you want access to vis.js network api you can set the state in a parent component using this property
                        }}
                    />
                </div>
            );
            // Sinon, affiche un logo de chargement (N'est pas utilisé normalement)
        } else {
            return <div><CircularProgress className="progress" /><p className="progress-label">En attente de résultats</p></div>
        }
    }
}

export default Loop;