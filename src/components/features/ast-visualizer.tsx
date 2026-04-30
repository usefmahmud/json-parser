import type { AST } from '@/parser/ast';
import { Position, ReactFlow, type Edge, type Node } from '@xyflow/react';
import { useEffect, useMemo, useRef } from 'react';

interface ASTVisualizerProps {
  ast: AST | null;
}

const ASTVisualizer = ({ ast }: ASTVisualizerProps) => {
  const { nodes, edges } = useMemo(() => buildGraph(ast), [ast]);

  const rfInstance = useRef<any>(null);

  useEffect(() => {
    if (rfInstance.current?.fitView) {
      const t = setTimeout(
        () => rfInstance.current.fitView({ padding: 0.12 }),
        50
      );
      return () => clearTimeout(t);
    }
  }, [nodes.length, edges.length]);

  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onInit={(instance) => {
          rfInstance.current = instance;

          instance?.fitView?.({ padding: 0.12 });
        }}
      />
    </div>
  );
};

export default ASTVisualizer;

const buildGraph = (ast: AST | null) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  if (!ast) return { nodes, edges };

  let nodeId = 0;

  let currentLeaf = 0;
  const xSpacing = 220;
  const ySpacing = 110;

  const processNode = (
    node: AST,
    parentId?: string,
    label?: string,
    depth = 0
  ): string => {
    const currentId = `node-${nodeId++}`;

    let children: Array<{ node: AST; label?: string }> = [];
    if (node.type === 'Object') {
      children = Object.entries(node.value).map(([k, v]) => ({
        node: v,
        label: k,
      }));
    } else if (node.type === 'Array') {
      children = node.value.map((it, i) => ({ node: it, label: `[${i}]` }));
    }

    if (children.length === 0) {
      const x = depth * xSpacing;
      const y = currentLeaf * ySpacing;

      switch (node.type) {
        case 'String':
          nodes.push({
            id: currentId,
            data: { label: `String: "${node.value}"` },
            position: { x, y },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });
          break;
        case 'Number':
          nodes.push({
            id: currentId,
            data: { label: `Number: ${node.value}` },
            position: { x, y },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });
          break;
        case 'Boolean':
          nodes.push({
            id: currentId,
            data: { label: `Boolean: ${node.value}` },
            position: { x, y },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });
          break;
        case 'Null':
          nodes.push({
            id: currentId,
            data: { label: 'Null' },
            position: { x, y },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });
          break;
      }

      currentLeaf++;
    } else {
      const childIds = children.map((c) =>
        processNode(c.node, currentId, c.label, depth + 1)
      );

      const childYs = childIds.map((cid) => {
        const n = nodes.find((nn) => nn.id === cid);
        return n ? (n.position as { x: number; y: number }).y : 0;
      });
      const y = childYs.reduce((a, b) => a + b, 0) / childYs.length;
      const x = depth * xSpacing;

      if (node.type === 'Object') {
        nodes.push({
          id: currentId,
          data: { label: 'Object' },
          position: { x, y },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });
      } else if (node.type === 'Array') {
        nodes.push({
          id: currentId,
          data: { label: `Array[${node.value.length}]` },
          position: { x, y },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });
      }
    }

    if (parentId && label) {
      edges.push({
        id: `${parentId}-to-${currentId}`,
        source: parentId,
        target: currentId,
        label,
      });
    }

    return currentId;
  };

  processNode(ast);
  console.log(nodes, edges);
  return { nodes, edges };
};
