import { create } from "zustand"; // Import Zustand's create function for state management
import { applyNodeChanges, applyEdgeChanges } from "reactflow"; // Import functions from reactflow for handling node and edge changes

// Create Zustand store
const useStore = create((set, get) => ({
  nodes: [], // Array to hold nodes
  edges: [], // Array to hold edges
  errorMessage: "", // String to store error messages

  // Setter function to update error message
  setErrorMessage: (message) => set({ errorMessage: message }),

  // Setter function to update nodes
  setNodes: (newNodes) => set({ nodes: newNodes }),

  // Setter function to update edges
  setEdges: (newEdges) => set({ edges: newEdges }),

  // Listener function to apply node changes
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes), // Apply changes to nodes using reactflow's applyNodeChanges function
    })),

  // Listener function to apply edge changes
  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges), // Apply changes to edges using reactflow's applyEdgeChanges function
    }),

  // Function to update edges using a custom update function
  updateEdges: (updateFunc) =>
    set((state) => ({ edges: updateFunc(state.edges) })),

  // Function to update a specific edge
  updateEdge: (oldEdge, newConnection) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === oldEdge.id ? { ...edge, ...newConnection } : edge // Update edge if IDs match, otherwise return original edge
      ),
    })),

  // Function to add a new node
  addNode: (node) =>
    set({
      nodes: [...get().nodes, node], // Add new node to the nodes array
    }),
}));

export default useStore; // Export useStore hook as default
