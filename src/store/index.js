import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges } from "reactflow";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  errorMessage: "",
  setErrorMessage: (message) => set({ errorMessage: message }),
  setNodes: (newNodes) => set({ nodes: newNodes }),
  setEdges: (newEdges) => set({ edges: newEdges }),
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),
  updateEdges: (updateFunc) =>
    set((state) => ({ edges: updateFunc(state.edges) })),
  updateEdge: (oldEdge, newConnection) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === oldEdge.id ? { ...edge, ...newConnection } : edge
      ),
    })),
  addNode: (node) =>
    set({
      nodes: [...get().nodes, node],
    }),
}));

export default useStore;
