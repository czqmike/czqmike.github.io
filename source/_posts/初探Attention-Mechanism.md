---
title: 初探Attention Mechanism
date: 2020-11-13 09:47:38
tags: 
- Machine Learning 
- Attention Mechanism 
---

## What is attention mechainism?
> Attention is a just **vector**, often the ouputs of dense layer using softmax function.

###  Memory of human
  - Sensory Memory 
  - Working Memory
    Attention 
    > It can be a long time memory and input / output with different sequences.
    E.g. machine translation
  - Long-term Memory 

It is a mechanism to improve performance of encoder + decoder model based on RNN (LSTM or GRU). It can also describe what mechan has learnt and open the black box of deep learning.

## Why attention?
Traditional seq-to-seq model encodes all input information as a fixed-length vector, which makes it difficult to copy with long sentence. The performance deteriorates rapidly as the length of input sentence increases.

So it does not attempt to encode input sentence into a single fixed-length vector. Instead, it encodes the input sentence into a sequence of vectors and *chooses a subset of these vectors* while decoding.

## How does it work?
- Generate $Y_t$ in timestep t
  1. Encode input sentence $X_1..X_n$ and get hidden states of encoder RNN: $h_1, h_2, ..,  h_n $
  2. Get decoder's previous internal state and set as $z$ 
  3. Scores: do **match** with $h_1$ .. $h_n$ and $z$, then calculate the similarity $a^t_0 .. a^t_i$ of them
  4. Attention weight: do softmax with $a^t_0 .. a^t_n$ to $\hat{a}^t_0 .. \hat{a}^t_n$
  apply weights to hidden states as context vector: $$c_i = \sum_{i=1}^{n} {\hat{a}^t_i h_i }$$
  5. Decoder hidden states $s$: $s_t = s_{t-1} + c_i$
  6. Generate output $Y$: decode $S_t$ to generate output $Y_t$

  > What is *match*?
  *match* is a align method to descripe how much input words $X$ influence on output $Y_t$
  we can define it as: 
  - cos similarity of $z$ and $h$
  - small NN whose input is $z$ and $h$, output is a scalar 
  - $a = h^TWz$


![Attention_Mechanism](https://pic4.zhimg.com/80/v2-163c0c3dda50d1fe7a4f7a64ba728d27_1440w.jpg)

## How many attention method there are?
- soft attention & hard attention
- global attention & local attention
- self attention
- hierarchical attention
  For document classfication
- attention over attention

## Essence of attention
![Essence](https://zrspic.oss-cn-beijing.aliyuncs.com/20190804141140.png)

The essence of attention is to weighted sum value of source, and weight is calculated by the relationship of key and value.
$$ Attention(Query, Source) = \sum_{i=1}^{L_x}Similarity(Query, Key_i) * Value_i $$

***
Another way:
Attention is like the computer's memory addressing.

## Application 
- Mechan translation
- Image caption extraction
- Document classification
- Speech recognition
