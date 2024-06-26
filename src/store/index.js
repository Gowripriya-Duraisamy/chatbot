import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges } from "reactflow";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
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
  addNode: (node) =>
    set({
      nodes: [...get().nodes, node],
    }),
  setSelectedNode: (node) => set({ selectedNode: node }),
}));

export default useStore;
