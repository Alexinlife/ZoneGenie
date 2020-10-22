/**
 * 1838304 - Alex Lajeunesse
 * 
 * Vertex
 * 
 * Noeud en français. Composant du graphe contenant des données.
 * Est lié à d'autres noeuds avec des arêtes.
 * Sert à définir les zones et leur couleur dans cette application.
 */
class Vertex {
    
    /**
     * Alex Lajeunesse
     * 
     * Constructeur de Vertex
     * 
     * @param idVertex L'id du noeud
     * @param groupVertex Le groupe du noeud
     * @returns null
     */
    constructor(idVertex, groupVertex) {
        this.id = idVertex;
        this.label = String(idVertex);
        this.group = groupVertex;
    }
}

export default Vertex;