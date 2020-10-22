/**
 * 1838304 - Alex Lajeunesse
 * 
 * Edge
 * 
 * Arête en français. Composant du graphe.
 * Relie deux noeuds entre eux.
 */
class Edge {

    /**
     * Alex Lajeunesse
     * 
     * Constructeur de Edge
     * 
     * @param idFrom L'id du premier noeud
     * @param idTo L'id du second noeud
     * @returns null
     */
    constructor(idFrom, idTo) {
        this.from = idFrom;
        this.to = idTo;
    }
}

export default Edge;