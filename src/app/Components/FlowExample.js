'use client'

import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [];
const initialEdges = [];

export default function FlowExample() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Enable drop on the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${+new Date()}`, // unique id
        type: "default",
        position,
        data: { label: `${type} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar for dragging nodes */}
      <aside
        style={{
          width: 150,
          padding: 10,
          borderRight: "1px solid #ddd",
          background: "#f7f7f7",
        }}
      >
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("application/reactflow", "Task")}
          style={{ padding: "8px", margin: "8px", border: "1px solid #aaa", cursor: "grab" }}
        >
          Task Node
        </div>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("application/reactflow", "Decision")}
          style={{ padding: "8px", margin: "8px", border: "1px solid #aaa", cursor: "grab" }}
        >
          Decision Node
        </div>
         <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("application/reactflow", "Decision")}
          style={{ padding: "8px", margin: "8px", border: "1px solid #aaa", cursor: "grab" }}
        >
          Decision Node
        </div>
      </aside>

      {/* ReactFlow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
