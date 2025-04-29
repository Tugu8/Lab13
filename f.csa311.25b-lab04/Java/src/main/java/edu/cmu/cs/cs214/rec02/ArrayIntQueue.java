package edu.cmu.cs.cs214.rec02;

import java.util.Arrays;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * A resizable-array implementation of the {@link IntQueue} interface. The head of
 * the queue starts out at the head of the array, allowing the queue to grow and
 * shrink in constant time.
 *
 * TODO: This implementation contains three bugs! Use your tests to determine the
 * source of the bugs and correct them!
 *
 * @author Alex Lockwood
 * @author Ye Lu
 */
public class ArrayIntQueue implements IntQueue {
    private static final Logger logger = LogManager.getLogger(ArrayIntQueue.class);

    /**
     * An array holding this queue's data
     */
    private int[] elementData;

    /**
     * Index of the next dequeue-able value
     */
    private int head;

    /**
     * Current size of queue
     */
    private int size;

    /**
     * The initial size for new instances of ArrayQueue
     */
    private static final int INITIAL_SIZE = 10;

    /**
     * Constructs an empty queue with an initial capacity of ten.
     */
    public ArrayIntQueue() {
        elementData = new int[INITIAL_SIZE];
        head = 0;
        size = 0;
    }

    /** {@inheritDoc} */
    public void clear() {
        logger.debug("Clearing the queue");
        Arrays.fill(elementData, 0);
        size = 0;
        head = 0;
    }

    /** {@inheritDoc} */
    public Integer dequeue() {
        if (isEmpty()) {
            logger.warn("Attempted to dequeue from an empty queue");
            return null;
        }
        Integer value = elementData[head];
        logger.info("Dequeued value: {}", value);
        head = (head + 1) % elementData.length;
        size--;
        return value;
    }

    /** {@inheritDoc} */
    public boolean enqueue(Integer value) {
        logger.debug("Enqueuing value: {}", value);
        ensureCapacity();
        int tail = (head + size) % elementData.length;
        elementData[tail] = value;
        size++;
        return true;
    }

    /** {@inheritDoc} */
    public boolean isEmpty() {
        boolean empty = size == 0;
        logger.trace("Queue is empty: {}", empty);
        return empty;
    }

    /** {@inheritDoc} */
    public Integer peek() {
        if (isEmpty()) {
            logger.warn("Attempted to peek at an empty queue");
            return null;
        }
        Integer value = elementData[head];
        logger.info("Peeked value: {}", value);
        return value;
    }

    /** {@inheritDoc} */
    public int size() {
        return size;
    }

    /**
     * Increases the capacity of this <tt>ArrayIntQueue</tt> instance, if
     * necessary, to ensure that it can hold at least size + 1 elements.
     */
    private void ensureCapacity() {
        if (size == elementData.length) {
            logger.debug("Ensuring capacity. Current size: {}", size);
            int oldCapacity = elementData.length;
            int newCapacity = 2 * oldCapacity + 1;
            int[] newData = new int[newCapacity];
            for (int i = 0; i < size; i++) {
                newData[i] = elementData[(head + i) % oldCapacity];
            }
            elementData = newData;
            head = 0;
        }
    }
}
