import Edge from "./Edge";
import Vertex from "./Vertex";

/**
 * 1838304 - Alex Lajeunesse
 * 
 * Graph
 * 
 * Graphe en français.
 * Structure de données composée de noeuds et d'arêtes
 * Sert à générer des régions dans cette application
 */
class Graph {

    /**
     * Alex Lajeunesse
     * 
     * Constructeur de Graph
     * 
     * @param null
     * @returns null
     */
    constructor() {
        this.vertices = [];
        this.edges = [];
        this.currentId = 0;
        this.grade = 0;
    }

    /**
     * Alex Lajeunesse
     * 
     * Crée un noeud et l'ajoute au graphe
     * 
     * @param group l'index du groupe (couleur) qui lui sera assigné
     * @returns null
     */
    createVertex(group) {
        this.vertices.push(new Vertex(this.currentId, group));
        this.currentId++;
    }

    /**
     * Alex Lajeunesse
     * 
     * Cherche dans le graphe le noeud recherché
     * 
     * @param id l'index du noeud qui est recherché
     * @returns le noeud s'il existe, sinon false
     */
    findVertex(id) {
        for (let index = 0; index < this.vertices.length; index++) {
            if (this.vertices[index].id === id) {
                return this.vertices[index];
            }
        }
        return false;
    }

    /**
     * Alex Lajeunesse
     * 
     * Connecte deux noeuds ensemble en créant un arête.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns null
     */
    connectVertices(from, to) {
        // Si les noeuds existent
        var vertex0 = this.findVertex(from);
        var vertex1 = this.findVertex(to);

        if (vertex0 !== false && vertex1 !== false) {
            this.createEdge(vertex0.id, vertex1.id);
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Crée un arête reliant deux noeuds.
     * Vérifie si le lien existe déjà.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns null
     */
    createEdge(from, to) {
        if (from > to) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        if (this.findEdge(from, to) === false && from !== to) {
            this.edges.push(new Edge(from, to));
        }
    }

    /**
     * Alex Lajeunesse
     * 
     * Trouve un arête relié à deux noeuds.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns true si l'arête existe, sinon false
     */
    findEdge(from, to) {
        for (let index = 0; index < this.edges.length; index++) {
            if (this.edges[index].from === from && this.edges[index].to === to) {
                return true;
            }
        }
        return false;
    }
}

export default Graph;